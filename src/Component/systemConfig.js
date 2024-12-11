import React, { useState } from 'react';

const SystemConfig = () => {
    const [parameters, setParameters] = useState({
        totalTickets: 0,
        ticketReleaseRate: 0,
        customerRetrevalRate: 0,
        maxTicketCapacity: 0,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setParameters((prevParameters) => ({
            ...prevParameters,
            [name]: value,
        }));
    };

    const loadParameters = async () => {
        // Load parameters from API
        try {
            const response = await fetch('http://localhost:8080/system');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setParameters(data);
        } catch (error) {
            alert ('Error loading parameters:', error);
        }
    };

    const saveParameters = async () => {
        // Validation check
        const { totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity } = parameters;
        if (totalTickets < 1 || ticketReleaseRate < 1 || customerRetrievalRate < 1 || maxTicketCapacity < 1 ) {
            alert('All parameter values must be greater than or equal to 1.');
            return; // Block the save function
        }
        // Save parameters to API
        try {
            const response = await fetch('http://localhost:8080/system', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parameters),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            alert ('Error saving parameters:', error);
        }
    };

    return (
        <div>
            <h2>System Config</h2>
            <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '5px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="totalTickets">Total Tickets: </label>
                    <input
                        type="number"
                        id="totalTickets"
                        name="totalTickets"
                        value={parameters.totalTickets}
                        onChange={handleChange}
                        min="1"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="ticketReleaseRate">Ticket Release Rate: </label>
                    <input
                        type="number"
                        id="ticketReleaseRate"
                        name="ticketReleaseRate"
                        value={parameters.ticketReleaseRate}
                        onChange={handleChange}
                        min="1"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="customerRetrievalRate">Customer Retrieval Rate: </label>
                    <input
                        type="number"
                        id="customerRetrievalRate"
                        name="customerRetrievalRate"
                        value={parameters.customerRetrievalRate}
                        onChange={handleChange}
                        min="1"
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label htmlFor="maxTicketCapacity">Max Ticket Capacity: </label>
                    <input
                        type="number"
                        id="maxTicketCapacity"
                        name="maxTicketCapacity"
                        value={parameters.maxTicketCapacity}
                        onChange={handleChange}
                        min="1"
                    />
                </div>
                <button onClick={loadParameters} style={{ marginRight: '10px' }}>Load Parameters</button>
                <button onClick={saveParameters}>Save Parameters</button>
            </div>
        </div>
    );
};

export default SystemConfig;
