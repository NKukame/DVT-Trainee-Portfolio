import React, { useState } from 'react';
import './AI.css';
import AssistantIcon from '@mui/icons-material/Assistant';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import dvtLogo from '../../assets/dvt_logo.jpg';
import { useMutation } from '@tanstack/react-query';
import { getResponse } from '../../lib/chat';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function AI() {
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [query, setQuery] = useState('');
    const chatMutation = useMutation({
      mutationFn: getResponse,
      onSuccess: (data) => {
        const now = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        setMessages((prev) => [
          ...prev,
          {
            text: (
              <Markdown remarkPlugins={[remarkGfm]}>{data.response}</Markdown>
            ),
            sender: "bot",
            timestamp: now,
          },
        ]);
      },
      onError: (error) => {
        let userMessage = "Sorry, I Encountered An Issue. Please Try Again.";

        if (
          error.message?.includes("429") ||
          error.message?.includes("capacity exceeded")
        ) {
          userMessage =
            "I'm Currently Experiencing High Demand. Please Try Again In A Moment.";
        } else if (
          error.message?.includes("network") ||
          error.message?.includes("fetch")
        ) {
          userMessage =
            "Connection Issue Detected. Please Check Your Internet And Try Again.";
        }

        setMessages((prev) => [...prev, { text: userMessage, sender: "bot" }]);
        console.error(error);
      },
    }); 
    
    const togglePanel = () => {
        setIsPanelVisible(!isPanelVisible);
    };

    const adjustTextareaHeight = (event) => {
        const textarea = event.target;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        setUserInput(textarea.value);
    };

    const sendMessage = () => {
      if (userInput.trim()) {
        const now = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        setMessages((prev) => [
          ...prev,
          { text: userInput, sender: "user", timestamp: now },
        ]);

        chatMutation.mutate(userInput);
        setUserInput("");
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
                                <div key={index} className={`message ${message.sender}`}>
                                    {message.text}
                                    <div className="timestamp">{message.timestamp}</div>
                                </div>
                                
                            ))}
                            {chatMutation.isPending && (
                                <div className='message bot'>
                                    <p>Thinking...</p>
                                </div>
                            )}
                        </div>
                        <div className='input-container'>
                            <textarea
                                className='chat-messanger'
                                placeholder='Type Your Message'
                                value={userInput}
                                onInput={adjustTextareaHeight}
                            ></textarea>
                            <button className='send-btn' onClick={sendMessage}><SendIcon fontSize="small" /></button>
                        </div>
                    </div>
                )}
            </div>
    );
}

export default AI;