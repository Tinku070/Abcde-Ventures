import { useState } from "react";
import axios from "axios";
import ItemList from "./ItemList";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/users/login", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setLoggedIn(true);
    } catch (err) {
      if (err.response?.status === 403) {
        alert("You are already logged in on another device");
      } else {
        alert("Invalid username or password");
      }
    }
  };

  if (loggedIn) return <ItemList />;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "12px",
          width: "420px",        /* ⬅️ wider */
          boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>Login</h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button style={{ width: "100%", fontSize: "18px" }} onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
