import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const WebSocketMessages = () => {
    const [messages, setMessages] = useState(['Waiting for messages...']);
    
    useEffect(() => {
        // WebSocket connection setup
        const socket = new SockJS('http://localhost:8080/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket, onConnect: () => {
                console.log('Connected to WebSocket');
                stompClient.subscribe('/topic/logs', (message) => {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        message.body
                    ]);
                });
            },
            onDisconnect: () => {
                alert ('Disconnected from WebSocket');
            },
            onWebSocketError: (error) => {
                alert ('WebSocket error:', error);
            },
        });

        stompClient.activate();

        // Cleanup on component unmount
        return () => {
            if (stompClient.connected) {
                stompClient.deactivate();
            }
        };
    }, []);

    return (
        <div>
            <h2>Log Messages</h2>
            <div id="messages" style={{ border: '1px solid #ddd', padding: '10px', maxWidth: '600px', marginTop: '10px', height: '300px', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <p key={index} style={{ margin: '5px 0', padding: '5px', background: '#f9f9f9', borderRadius: '5px' }}>
                        {message}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default WebSocketMessages;
