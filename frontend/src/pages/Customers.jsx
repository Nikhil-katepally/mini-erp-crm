import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Customers() {
  const [customers, setCustomers] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [customerName, setCustomerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [customerType, setCustomerType] = useState("RETAIL");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("LEAD");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await api.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setCustomerName("");
    setMobileNumber("");
    setEmail("");
    setBusinessName("");
    setGstNumber("");
    setCustomerType("RETAIL");
    setAddress("");
    setStatus("LEAD");
    setNotes("");
  };

  const addCustomer = async () => {
    try {
      await api.post("/customers", {
        customerName,
        mobileNumber,
        email,
        businessName,
        gstNumber,
        customerType,
        address,
        status,
        notes,
      });

      alert("Customer Added Successfully");
      clearForm();
      loadCustomers();
    } catch (error) {
      console.log(error);
      alert("Failed to Add Customer");
    }
  };

  const editCustomer = (customer) => {
    setEditingId(customer.id);
    setCustomerName(customer.customerName);
    setMobileNumber(customer.mobileNumber);
    setEmail(customer.email);
    setBusinessName(customer.businessName);
    setGstNumber(customer.gstNumber || "");
    setCustomerType(customer.customerType);
    setAddress(customer.address);
    setStatus(customer.status);
    setNotes(customer.notes || "");
  };

  const updateCustomer = async () => {
    try {
      await api.put(`/customers/${editingId}`, {
        customerName,
        mobileNumber,
        email,
        businessName,
        gstNumber,
        customerType,
        address,
        status,
        notes,
      });

      alert("Customer Updated Successfully");

      clearForm();
      loadCustomers();
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

  const deleteCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await api.delete(`/customers/${id}`);

      alert("Customer Deleted");

      loadCustomers();
    } catch (error) {
      console.log(error);
      alert("Delete Failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h1>Customers</h1>

        <div
          style={{
            marginBottom: "20px",
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "10px",
          }}
        >
          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder="Business Name"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
          />

          <input
            placeholder="GST Number"
            value={gstNumber}
            onChange={(e) => setGstNumber(e.target.value)}
          />

          <select
            value={customerType}
            onChange={(e) => setCustomerType(e.target.value)}
          >
            <option value="RETAIL">Retail</option>
            <option value="WHOLESALE">Wholesale</option>
            <option value="DISTRIBUTOR">Distributor</option>
          </select>

          <input
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="LEAD">Lead</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <input
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          {editingId ? (
            <button onClick={updateCustomer}>
              Update Customer
            </button>
          ) : (
            <button onClick={addCustomer}>
              Add Customer
            </button>
          )}
        </div>
        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Business</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.customerName}</td>
                <td>{customer.businessName}</td>
                <td>{customer.mobileNumber}</td>
                <td>{customer.email}</td>
                <td>{customer.customerType}</td>
                <td>{customer.status}</td>

                <td>
                  <button
                    onClick={() => editCustomer(customer)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCustomer(customer.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}

export default Customers;