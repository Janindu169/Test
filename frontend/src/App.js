import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productName: "",
    price: "",
    category: "",
    stock: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleChange = (e) => { 
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/products", form);
    setForm({ productName: "", price: "", category: "", stock: "" });
    fetchProducts();
  }

  return (
    <div>
      <h1>Product Manager</h1>

      <form onSubmit={addProduct}>
        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
        <button type="submit">Add Product</button>
      </form>

      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.productName}</h3>
          <p>Price: {product.price}</p>
          <p>Category: {product.category}</p>
          <p>Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
}

export default App;