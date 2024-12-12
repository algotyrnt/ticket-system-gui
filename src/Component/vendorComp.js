import React, { useState, useEffect } from "react";

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({totalTickets: '',ticketReleaseRate: ''});
  const [editVendor, setEditVendor] = useState(null);

  // Fetch all vendors
  const fetchVendors = async () => {
    try {
      const response = await fetch("http://localhost:8080/vendor/all");
      if (!response.ok) throw new Error("Failed to fetch vendors");
      const data = await response.json();
      setVendors(data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  // Add a new vendor
  const addVendor = async () => {
     // Validation check
     const { totalTickets, ticketReleaseRate } = newVendor;
     if (totalTickets < 1 || ticketReleaseRate < 1) {
         alert('parameter values must be greater than 0.');
         return; // Block the save function
     }
    try {
      const response = await fetch("http://localhost:8080/vendor/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketReleaseRate: parseInt(newVendor.ticketReleaseRate, 10),
          totalTickets: parseInt(newVendor.totalTickets, 10),
        }),
      });

      if (!response.ok) throw new Error("Failed to add vendor");

      const newVendorData = await response.json();
      setVendors([...vendors, newVendorData]);
      setNewVendor({ totalTickets: '', ticketReleaseRate: ''});
    } catch (error) {
      console.error("Error adding vendor:", error);
    }
  };

  // Delete a vendor
  const deleteVendor = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/vendor/delete/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete vendor");

      setVendors(vendors.filter((vendor) => vendor.id !== id));
    } catch (error) {
      console.error("Error deleting vendor:", error);
    }
  };

  // Update a vendor
  const updateVendor = async () => {
     // Validation check
     const { totalTickets, ticketReleaseRate } = editVendor;
     if (totalTickets < 1 || ticketReleaseRate < 1) {
         alert('parameter values must be greater than 0.');
         return; // Block the save function
     }
    try {
      const response = await fetch("http://localhost:8080/vendor/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketReleaseRate: parseInt(editVendor.ticketReleaseRate, 10),
          totalTickets: parseInt(editVendor.totalTickets, 10),
        }),
      });

      if (!response.ok) throw new Error("Failed to update vendor");

      const updatedVendor = await response.json();
      setVendors(
        vendors.map((vendor) =>
          vendor.id === updatedVendor.id ? updatedVendor : vendor
        )
      );
      setEditVendor(null);
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div style={{ maxWidth: '90%', border: '1px solid #ddd', borderRadius: '5px', height: '350px', overflowY: 'auto' }}>
      <h4>Vendor</h4>

      {/* Add Vendor */}
      <div>
        <input
          type="number"
          placeholder="Total Tickets"
          value={newVendor.totalTickets}
          onChange={(e) =>
            setNewVendor({ ...newVendor, totalTickets: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Ticket Release Rate"
          value={newVendor.ticketReleaseRate}
          onChange={(e) =>
            setNewVendor({ ...newVendor, ticketReleaseRate: e.target.value })
          }
        />
        <button onClick={addVendor}>Add</button>
      </div>

      {/* List Vendors */}
      <ul>
        {vendors.map((vendor) => (
          <li key={vendor.id} style={{listStyle: 'none'}}>
            ID: {vendor.id} - Total Tickets: {vendor.totalTickets}, Ticket Release Rate: {vendor.ticketReleaseRate}
            <button onClick={() => deleteVendor(vendor.id)} style={{ marginLeft: "20px"}}>Delete</button>
            <button onClick={() => setEditVendor(vendor)} style={{ marginLeft: "20px"}}>Edit</button>
          </li>
        ))}
      </ul>

      {/* Update Vendor */}
      {editVendor && (
        <div>
          <h2>Edit Vendor</h2>
          <input
            type="number"
            placeholder="Total Tickets"
            value={editVendor.totalTickets}
            onChange={(e) =>
              setEditVendor({ ...editVendor, totalTickets: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Ticket Release Rate"
            value={editVendor.ticketReleaseRate}
            onChange={(e) =>
              setEditVendor({ ...editVendor, ticketReleaseRate: e.target.value })
            }
          />
          <button onClick={updateVendor}>Update</button>
        </div>
      )}
    </div>
  );
};

export default VendorManagement;
