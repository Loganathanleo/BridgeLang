import React, { useState, useEffect } from "react";
import './bridgelang.css';

function Bridgelang() {
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);
    const [targetLanguage, setTargetLanguage] = useState(""); 

    useEffect(() => {
        const fetchInitialBotMessage = () => {
            const botMessage = { sender: "Bot", text: "Hi, what language do you want to learn?" };
            setChatLog([botMessage]);
        };

        fetchInitialBotMessage();
    }, []); 

    const sendMessage = async () => {
        if (message.trim() === "") return;

        const userMessage = { sender: "You", text: message };
        setChatLog((prev) => [...prev, userMessage]);

        if (targetLanguage === "") {
            setTargetLanguage(message.toLowerCase()); 
            setChatLog((prev) => [
                ...prev,
                { sender: "Bot", text: `Great! You're learning ${message}. Let's start chatting!` },
            ]);
        } else {
            const requestData = {
                input: message,
                target_language: targetLanguage,
            };

            try {
                const response = await fetch("http://127.0.0.1:8000/bridgelang", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                });

                const data = await response.json();

                const botResponse = { 
                    sender: "Bot", 
                    text: data.translated_sentence || "I couldn't understand that." 
                };
                setChatLog((prev) => [...prev, botResponse]);
            } catch (error) {
                console.error("Error processing the message:", error);
                const errorResponse = { sender: "Bot", text: "Sorry, there was an error processing your request." };
                setChatLog((prev) => [...prev, errorResponse]);
            }
        }

        setMessage(""); 
    };

    return (
        <div className="chatbot-container">
            <div className="chat-display">
                {chatLog.map((entry, index) => (
                    <div key={index} className={`chat-bubble ${entry.sender === "You" ? "user" : "bot"}`}>
                        <strong>{entry.sender}:</strong> {entry.text}
                    </div>
                ))}
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    className="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button className="send-button" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Bridgelang;
