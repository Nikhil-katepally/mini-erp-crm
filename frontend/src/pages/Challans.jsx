import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Challans() {
  const [challans, setChallans] = useState([]);

  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    loadChallans();
  }, []);

  const loadChallans = async () => {
    try {
      const res = await api.get("/challans");
      setChallans(res.data);
    } catch (err) {
      console.log(err);
    }
  };

 const createChallan = async () => {
  try {
    const res = await api.post("/challans", {
      customerId: Number(customerId),
      items: [
        {
          productId: Number(productId),
          quantity: Number(quantity),
        },
      ],
    });

    console.log(res.data);

    alert("Challan Created Successfully");

    loadChallans();
  } catch (error) {
    console.log(error);
    console.log(error.response);

    alert(error.response?.data?.message || "Failed");
  }
};

  const confirmChallan = async (id) => {
    try {
      await api.put(`/challans/${id}/confirm`);

      alert("Challan Confirmed");

      loadChallans();
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px", width: "100%" }}>
        <h1>Sales Challans</h1>

        <input
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />

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

        <button
          onClick={createChallan}
          style={{ marginLeft: "10px" }}
        >
          Create Challan
        </button>

        <hr />

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
              <th>Challan No</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Total Qty</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {challans.map((challan) => (
              <tr key={challan.id}>
                <td>{challan.id}</td>
                <td>{challan.challanNumber}</td>
                <td>{challan.customer.customerName}</td>
                <td>{challan.status}</td>
                <td>{challan.totalQuantity}</td>
                <td>
                  {challan.status === "DRAFT" ? (
                    <button
                      onClick={() => confirmChallan(challan.id)}
                    >
                      Confirm
                    </button>
                  ) : (
                    "Completed"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Challans;