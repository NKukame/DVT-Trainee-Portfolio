// AI.tsx
import React, { useState, useRef, useEffect } from 'react';
import './AI.css';
import AssistantIcon from '@mui/icons-material/Assistant';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import dvtLogo from '../../assets/dvt_logo.jpg';
import { chatWithAI } from '../../lib/chat';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function AI() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null); // Add ref for textarea

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus textarea when panel opens
  useEffect(() => {
    if (isPanelVisible && textareaRef.current) {
      // Small delay to ensure the panel is fully rendered
      setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
    }
  }, [isPanelVisible]);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setUserInput(textarea.value);
  };

  const focusTextarea = () => {
    // Small delay to ensure state updates are complete
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        // Position cursor at the end
        textareaRef.current.setSelectionRange(
          textareaRef.current.value.length,
          textareaRef.current.value.length
        );
      }
    }, 50);
  };

  const sendMessage = async () => {
    if (!userInput.trim() || isLoading || isStreaming) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    const newUserMessage = { content: userInput, role: 'user', timestamp: now };
    const conversationHistory = [...messages, newUserMessage];
    
    // Add user message to UI
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      const result = await chatWithAI(conversationHistory);

      if (result.type === 'stream') {
        await handleStreamingResponse(result.stream, now);
      } else {
        // Non-streaming response (tool calls)
        setMessages((prev) => [...prev, { 
          content: result.content, 
          role: 'assistant', 
          timestamp: now 
        }]);
      }
    } catch (error) {
      let errorMessage = 'Sorry, I Encountered An Issue. Please Try Again.';
      if (error.message?.includes('429') || error.message?.includes('capacity exceeded')) {
        errorMessage = "I'm Currently Experiencing High Demand. Please Try Again In A Moment.";
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Connection Issue Detected. Please Check Your Internet And Try Again.';
      }

      setMessages((prev) => [...prev, { 
        content: errorMessage, 
        role: 'assistant', 
        timestamp: now 
      }]);
      console.error('Chat error:', error);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
      // Focus textarea after response is complete
      focusTextarea();
    }
  };

  const handleStreamingResponse = async (stream, timestamp) => {
    setIsStreaming(true);
    let streamedContent = '';
    
    // Add initial empty message for streaming
    setMessages((prev) => [...prev, { 
      content: '', 
      role: 'assistant', 
      timestamp, 
      isStreaming: true 
    }]);

    try {
      for await (const chunk of stream) {
        const delta = chunk;
        if (delta) {
          streamedContent += delta;
          
          // Update the streaming message
          setMessages((prev) => {
            const updated = [...prev];
            const messageIndex = updated.length - 1;
            if (updated[messageIndex] && updated[messageIndex].isStreaming) {
              updated[messageIndex] = {
                ...updated[messageIndex],
                content: streamedContent
              };
            }
            return updated;
          });
        }
      }
    } catch (streamError) {
      console.error('Streaming error:', streamError);
      streamedContent = 'Sorry, there was an error while streaming the response.';
    }

    // Mark streaming as complete
    setMessages((prev) => {
      const updated = [...prev];
      const messageIndex = updated.length - 1;
      if (updated[messageIndex] && updated[messageIndex].isStreaming) {
        updated[messageIndex] = {
          ...updated[messageIndex],
          content: streamedContent,
          isStreaming: false
        };
      }
      return updated;
    });

    setIsStreaming(false);
    // Focus textarea after streaming completes
    focusTextarea();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleTextareaClick = () => {
    // Ensure focus when clicking on textarea
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className='chatbot-container'>
      <div className='chat-container' onClick={togglePanel}>
        {isPanelVisible ? (
          <CloseIcon fontSize="large" className='ai-logo' />
        ) : (
          <AssistantIcon fontSize="large" className='ai-logo' />
        )}
      </div>
      {isPanelVisible && (
        <div className='message-panel'>
          <div className='chat-header'>
            <img src={dvtLogo} alt="Logo" className='chat-logo-header'/>
            <p>TOT</p>
          </div>
          <div className='message-container'>
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.role}`}>
                <div className="message-content">
                  {message.role === 'assistant' ? (
                    <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                  ) : (
                    message.content
                  )}
                  {message.isStreaming && (
                    <span className="streaming-cursor">▋</span>
                  )}
                </div>
                <div className="timestamp">{message.timestamp}</div>
              </div>
            ))}
            {isLoading && !isStreaming && (
              <div className='message assistant'>
                <div className="message-content">
                  <p>Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className='input-container'>
            <textarea
              ref={textareaRef} // Add ref to textarea
              className='chat-messanger'
              placeholder='Type Your Message'
              value={userInput}
              onChange={adjustTextareaHeight}
              onKeyDown={handleKeyPress}
              onClick={handleTextareaClick}
              disabled={isLoading || isStreaming}
            ></textarea>
            <button 
              className='send-btn' 
              onClick={sendMessage} 
              disabled={isLoading || isStreaming || !userInput.trim()}
            >
              <SendIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AI;