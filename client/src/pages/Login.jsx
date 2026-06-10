import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL ||"https://billflow-saas-oxxp.onrender.com";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      alert("Server error. Please try again.");
    }
  }

  return (
    <main className="page active">
      <section className="hero">
        <div className="hero-text">
          <h1>Manage SaaS Billing Smarter</h1>
          <p>
            Login to manage invoices, customers, plans, subscriptions, and
            payment history.
          </p>
        </div>

        <form className="auth-card" onSubmit={handleLogin}>
          <h2>Welcome Back ✨</h2>
          <p>Login to continue</p>

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-btn" type="submit">
            Login
          </button>

          <small>
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </small>
        </form>
      </section>
    </main>
  );
}

export default Login;