import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "230px",
        minHeight: "100vh",
        background: "#1f2937",
        color: "white",
        padding: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>Mini ERP</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link style={{ color: "white" }} to="/dashboard">
          📊 Dashboard
        </Link>

        <Link style={{ color: "white" }} to="/customers">
          👥 Customers
        </Link>

        <Link style={{ color: "white" }} to="/products">
          📦 Products
        </Link>

        <Link style={{ color: "white" }} to="/inventory">
          📦 Inventory
        </Link>

        <Link style={{ color: "white" }} to="/challans">
          📄 Challans
        </Link>
      </div>

      <button
        onClick={logout}
        style={{
          marginTop: "40px",
          width: "100%",
          padding: "10px",
          border: "none",
          background: "#ef4444",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;