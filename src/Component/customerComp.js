import React, { useState, useEffect } from "react";

const CustomerManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({customerRetrievalRate: '',totalTickets: ''});
  const [editCustomer, setEditCustomer] = useState(null);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8080/customer/all");
      if (!response.ok) throw new Error("Failed to fetch customers");
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

// Add a new customer
  const addCustomer = async () => {
    // Validation check
    const { totalTickets, ticketReleaseRate } = newCustomer;
    if (totalTickets < 1 || ticketReleaseRate < 1) {
        alert('parameter values must be greater than 0.');
        return; // Block the save function
    }
    try {
      const response = await fetch("http://localhost:8080/customer/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerRetrievalRate: parseInt(newCustomer.customerRetrievalRate, 10),
          totalTickets: parseInt(newCustomer.totalTickets, 10),
        }),
      });

      if (!response.ok) throw new Error("Failed to add customer");

      const newCustomerData = await response.json();
      setCustomers([...customers, newCustomerData]);
      setNewCustomer({ customerRetrievalRate: "", totalTickets: "" });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  // Delete a customer
  const deleteCustomer = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/customer/delete/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete customer");

      setCustomers(customers.filter((customer) => customer.id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Update a customer
  const updateCustomer = async () => {
    try {
      const response = await fetch("http://localhost:8080/customer/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editCustomer),
      });

      if (!response.ok) throw new Error("Failed to update customer");

      const updatedCustomer = await response.json();
      setCustomers(
        customers.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
      setEditCustomer(null);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div style={{ maxWidth: '90%', border: '1px solid #ddd', borderRadius: '5px', height: '350px', overflowY: 'auto' }}>
      <h4>Customers</h4>
      
      {/* Add Customer */}
      <div>
        <input
          type="number"
          placeholder="Retrieval Rate"
          value={newCustomer.customerRetrievalRate}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, customerRetrievalRate: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Total Tickets"
          value={newCustomer.totalTickets}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, totalTickets: e.target.value })
          }
        />
        <button onClick={addCustomer}>Add</button>
      </div>
      
      {/* List Customers */}
      <ul>
        {customers.map((customer) => (
          <li key={customer.id} style={{listStyle: 'none'}}>
            ID: {customer.id} - Retrieval Rate: {customer.customerRetrievalRate}, Total Tickets: {customer.totalTickets}
            <button onClick={() => deleteCustomer(customer.id)} style={{ marginLeft: "20px"}}>Delete</button>
            <button onClick={() => setEditCustomer(customer)} style={{ marginLeft: "20px"}}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Update Customer */}
      {editCustomer && (
        <div>
          <input
            type="number"
            placeholder="Retrieval Rate"
            value={editCustomer.customerRetrievalRate}
            onChange={(e) =>
              setEditCustomer({
                ...editCustomer,
                customerRetrievalRate: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="Total Tickets"
            value={editCustomer.totalTickets}
            onChange={(e) =>
              setEditCustomer({
                ...editCustomer,
                totalTickets: e.target.value,
              })
            }
          />
          <button onClick={updateCustomer}>Update</button>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
