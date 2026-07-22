import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Dashboard() {
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard</h1>

        <h3>Total Customers : {dashboard.totalCustomers}</h3>

        <h3>Total Products : {dashboard.totalProducts}</h3>

        <h3>Total Challans : {dashboard.totalChallans}</h3>

        <h3>Total Users : {dashboard.totalUsers}</h3>

        <h3>Low Stock Products : {dashboard.lowStockProducts}</h3>
      </div>
    </div>
  );
}

export default Dashboard;