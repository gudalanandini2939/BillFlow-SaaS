import { Link, useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  function handleGetStarted() {
    navigate("/login");
  }

  return (
    <main className="page active">
      <section className="hero">
        <div className="hero-text">
          <h1>Manage SaaS Billing Smarter</h1>

          <p>
            Billing portal with plans, subscriptions, invoices, customers,
            and payment tracking in one clean dashboard.
          </p>

          <button className="primary-btn" onClick={handleGetStarted}>
            Get Started
          </button>
        </div>

        <div className="auth-card">
          <h2>BillFlow Overview 🚀</h2>

          <p>
            Create invoices, manage customers, track payments and monitor
            revenue analytics from a single dashboard.
          </p>

          <div style={{ marginTop: "20px" }}>
            <Link to="/register" className="primary-btn">
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;