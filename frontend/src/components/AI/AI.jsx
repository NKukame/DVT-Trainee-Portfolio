// AI.tsx
import React, { useState } from 'react';
import './AI.css';
import AssistantIcon from '@mui/icons-material/Assistant';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import dvtLogo from '../../assets/dvt_logo.jpg';
import { chatWithAI } from '../../lib/chat'; // Updated path (was '../../lib/chat')
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function AI() {
  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };

  const adjustTextareaHeight = (event) => {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    setUserInput(textarea.value);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
  
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Create the new user message
    const newUserMessage = { content: userInput, role: 'user', timestamp: now };
    
    // Include current message in the conversation history for the AI
    const conversationHistory = [...messages, newUserMessage];
    
    // Add user message to UI
    setMessages((prev) => [...prev, newUserMessage]);
    setUserInput('');
    setIsLoading(true);
  
    try {
      // Pass the complete conversation history including the current message
      const streamResult = await chatWithAI(conversationHistory);
  
      // Start with an empty bot message for streaming
      setMessages((prev) => [...prev, { content: streamResult, role: 'assistant', timestamp: now, isStreaming: true }]);
  
     
      

      // Log usage and finish reason
      console.log(streamResult);
      console.log(streamResult.finishReason);
    } catch (error) {
      let errorMessage = 'Sorry, I Encountered An Issue. Please Try Again.';
      if (error.message?.includes('429') || error.message?.includes('capacity exceeded')) {
        errorMessage = "I'm Currently Experiencing High Demand. Please Try Again In A Moment.";
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        errorMessage = 'Connection Issue Detected. Please Check Your Internet And Try Again.';
      }
  
      setMessages((prev) => [...prev, { content: errorMessage, role: 'bot', timestamp: now }]);
      console.error(error);
    } finally {
      setIsLoading(false);
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
                {message.role === 'assistant' ? (
                  <Markdown remarkPlugins={[remarkGfm]}>{message.content}</Markdown>
                ) : (
                  message.content
                )}
                <div className="timestamp">{message.timestamp}</div>
              </div>
            ))}
            {isLoading && (
              <div className='message assistant'>
                <p>Thinking...</p>
              </div>
            )}
          </div>
          <div className='input-container'>
            <textarea
              className='chat-messanger'
              placeholder='Type Your Message'
              value={userInput}
              onChange={adjustTextareaHeight}
            ></textarea>
            <button className='send-btn' onClick={sendMessage} disabled={isLoading}>
              <SendIcon fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AI;