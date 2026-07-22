import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [productName, setProductName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("PCS");
  const [unitPrice, setUnitPrice] = useState("");
  const [currentStock, setCurrentStock] = useState(0);
  const [minimumStock, setMinimumStock] = useState("");
  const [warehouse, setWarehouse] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const clearForm = () => {
    setEditingId(null);
    setProductName("");
    setSku("");
    setDescription("");
    setCategory("");
    setUnit("PCS");
    setUnitPrice("");
    setCurrentStock(0);
    setMinimumStock("");
    setWarehouse("");
  };

  const addProduct = async () => {
    try {
      await api.post("/products", {
        productName,
        sku,
        description,
        category,
        unit,
        unitPrice: Number(unitPrice),
        currentStock: Number(currentStock),
        minimumStock: Number(minimumStock),
        warehouse,
      });

      alert("Product Added Successfully");

      clearForm();
      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Failed");
    }
  };

  const editProduct = (product) => {
    setEditingId(product.id);
    setProductName(product.productName);
    setSku(product.sku);
    setDescription(product.description || "");
    setCategory(product.category);
    setUnit(product.unit);
    setUnitPrice(product.unitPrice);
    setCurrentStock(product.currentStock);
    setMinimumStock(product.minimumStock);
    setWarehouse(product.warehouse);
  };

  const updateProduct = async () => {
    try {
      await api.put(`/products/${editingId}`, {
        productName,
        sku,
        description,
        category,
        unit,
        unitPrice: Number(unitPrice),
        currentStock: Number(currentStock),
        minimumStock: Number(minimumStock),
        warehouse,
      });

      alert("Product Updated");

      clearForm();
      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete Product?")) return;

    try {
      await api.delete(`/products/${id}`);

      alert("Product Deleted");

      loadProducts();
    } catch (err) {
      console.log(err);
      alert("Delete Failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ width: "100%", padding: "20px" }}>
        <h1>Products</h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "10px",
          }}
        >
          <input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <input
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            <option value="PCS">PCS</option>
            <option value="BOX">BOX</option>
            <option value="KG">KG</option>
            <option value="LITRE">LITRE</option>
          </select>

          <input
            type="number"
            placeholder="Unit Price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
          />

          <input
            type="number"
            placeholder="Minimum Stock"
            value={minimumStock}
            onChange={(e) => setMinimumStock(e.target.value)}
          />

          <input
            placeholder="Warehouse"
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
          />

          {editingId ? (
            <button onClick={updateProduct}>
              Update Product
            </button>
          ) : (
            <button onClick={addProduct}>
              Add Product
            </button>
          )}
        </div>
        <br />
        <br />

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
              <th>Name</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Min Stock</th>
              <th>Warehouse</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.productName}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.unit}</td>
                <td>₹ {product.unitPrice}</td>
                <td>{product.currentStock}</td>
                <td>{product.minimumStock}</td>
                <td>{product.warehouse}</td>

                <td>
                  <button
                    onClick={() => editProduct(product)}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(product.id)}
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

export default Products;