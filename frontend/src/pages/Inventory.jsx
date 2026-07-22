import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Inventory() {
  const [history, setHistory] = useState([]);

  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const res = await api.get("/stock/history");
      setHistory(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const stockIn = async () => {
    try {
      await api.post("/stock/in", {
        productId: Number(productId),
        quantity: Number(quantity),
        reason,
      });

      alert("Stock Added");

      loadHistory();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  const stockOut = async () => {
    try {
      await api.post("/stock/out", {
        productId: Number(productId),
        quantity: Number(quantity),
        reason,
      });

      alert("Stock Removed");

      loadHistory();
    } catch (error) {
      console.log(error);
      alert("Failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ width: "100%", padding: "20px" }}>
        <h1>Inventory</h1>

        <input
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          placeholder="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <br />
        <br />

        <button onClick={stockIn}>Stock IN</button>

        <button
          onClick={stockOut}
          style={{ marginLeft: "10px" }}
        >
          Stock OUT
        </button>

        <hr />

        <h2>History</h2>

        <table
          border="1"
          cellPadding="10"
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Reason</th>
              <th>User</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.product.productName}</td>
                <td>{item.movementType}</td>
                <td>{item.quantity}</td>
                <td>{item.reason}</td>
                <td>{item.createdBy.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;