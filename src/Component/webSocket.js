import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const WebSocketMessages = () => {
    const [messages, setMessages] = useState(['Waiting for logs...']);
    const [tickets, setTickets] = useState(0);
    
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
                stompClient.subscribe('/topic/tickets', (message) => {
                    const ticketCount = parseInt(message.body, 10);
                    setTickets(ticketCount);
                    console.log('Tickets:', message.body);
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
            <h2>RealTime Ticket System</h2>
            <div id="messages" style={{ maxWidth: '90%', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px', height: '580px', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <p key={index} style={{ margin: '5px 0', padding: '5px', background: '#f9f9f9', borderRadius: '5px', color: '#282c34'  }}>
                        {message}
                    </p>
                ))}
            </div>
            <div>
                <p>Available Tickets - {tickets}</p>
            </div>
        </div>
    );
};

export default WebSocketMessages;
