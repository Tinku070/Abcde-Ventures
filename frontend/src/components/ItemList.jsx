import { useEffect, useState } from "react";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [view, setView] = useState("items"); // items | cart | orders

  useEffect(() => {
    fetchItems();
  }, []);

  // ================= API CALLS =================

  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/items");
    setItems(res.data);
  };

  const addToCart = async (itemId) => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/carts",
      { itemId },
      { headers: { Authorization: token } }
    );
    alert("Item added to cart");
  };

  const fetchCart = async () => {
    const res = await axios.get("http://localhost:5000/carts");
    setCart(res.data);
    setView("cart");
  };

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:5000/orders");
    setOrders(res.data);
    setView("orders");
  };

  const checkout = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/orders",
      {},
      { headers: { Authorization: token } }
    );
    alert("Order placed successfully");
    setView("items");
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:5000/users/logout",
      {},
      { headers: { Authorization: token } }
    );
    localStorage.removeItem("token");
    window.location.reload();
  };

  // ================= UI =================

  return (
    <div style={{ padding: "40px", background: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "25px" }}>Items</h1>

      {/* ACTION BUTTONS */}
      <div style={{ marginBottom: "40px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <button className="btn" onClick={() => setView("items")}>Items</button>
        <button className="btn" onClick={fetchCart}>Cart</button>
        <button className="btn" onClick={fetchOrders}>Order History</button>
        <button className="btn" onClick={checkout}>Checkout</button>
        <button className="btn logout" onClick={logout}>Logout</button>
      </div>

      {/* ================= ITEMS VIEW ================= */}
      {view === "items" && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "30px",
          }}
        >
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => addToCart(item._id)}
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                cursor: "pointer",
                textAlign: "center",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <h2 style={{ fontSize: "28px", marginBottom: "10px" }}>
                {item.name}
              </h2>
              <p style={{ fontSize: "16px", color: "#555" }}>
                Click to add to cart
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ================= CART VIEW ================= */}
      {view === "cart" && (
        <div>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>Your Cart</h2>
          {cart.length === 0 ? (
            <p style={{ fontSize: "18px" }}>Cart is empty</p>
          ) : (
            cart.map((c) => (
              <div
                key={c._id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "15px",
                }}
              >
                <p style={{ fontSize: "18px" }}>
                  Items in cart: <b>{c.items.length}</b>
                </p>
              </div>
            ))
          )}
        </div>
      )}

      {/* ================= ORDER HISTORY VIEW ================= */}
      {view === "orders" && (
        <div>
          <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>Order History</h2>
          {orders.length === 0 ? (
            <p style={{ fontSize: "18px" }}>No orders found</p>
          ) : (
            orders.map((o) => (
              <div
                key={o._id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "12px",
                  marginBottom: "15px",
                }}
              >
                <p style={{ fontSize: "16px" }}>
                  <b>Order ID:</b> {o._id}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ItemList;
