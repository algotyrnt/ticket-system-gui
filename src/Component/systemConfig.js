import React, { useState } from 'react';

const SystemConfig = () => {
    const [parameters, setParameters] = useState({maxTicketCapacity: 0});

    const handleChange = (event) => { 
        const { name, value } = event.target; setParameters((prevParameters) => ({ ...prevParameters, [name]: value, })); };

    const startSystem = async () => {
        // Validation check
        const { maxTicketCapacity } = parameters;
        if (maxTicketCapacity < 1 ) {
            alert('parameter values must be greater than 0.');
            return; // Block the save function
        }
        // Save parameters to API
        try {
            const response = await fetch('http://localhost:8080/system/start', {
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

    const stopSystem = async () => {
        try {
        const response = await fetch("http://localhost:8080/system/stop", {
            method: "POST",
        });
        if (!response.ok) throw new Error("Failed to stop the system");
        alert("System stopped successfully");
        } catch (error) {
        alert("Error stopping system:", error);
        }
    };

    return (
        <div style={{ maxWidth: '90%', border: '1px solid #ddd', borderRadius: '5px', height: '30px'}}>
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
                    {/* Start and Stop Buttons */}
                    <button onClick={startSystem} style={{ marginLeft: "180px"}}>Start</button>
                    <button onClick={stopSystem} style={{ marginLeft: "10px"}}>Stop</button>
            </div>
        </div>
    );
};

export default SystemConfig;
