function Pricing() {
  return (
    <main className="page active">
      <h1 className="page-title">Choose Your Plan</h1>

      <section className="pricing-grid">
        <div className="plan-card">
          <h2>Basic</h2>
          <h1>₹199</h1>
          <p>For beginners</p>
          <ul>
            <li>✓ 1 User</li>
            <li>✓ Basic Billing</li>
            <li>✓ Email Support</li>
          </ul>
          <button>Choose Plan</button>
        </div>

        <div className="plan-card popular">
          <span className="badge">Popular</span>
          <h2>Pro</h2>
          <h1>₹499</h1>
          <p>Best for teams</p>
          <ul>
            <li>✓ 5 Users</li>
            <li>✓ Invoice History</li>
            <li>✓ Priority Support</li>
          </ul>
          <button>Choose Plan</button>
        </div>

        <div className="plan-card">
          <h2>Premium</h2>
          <h1>₹999</h1>
          <p>For businesses</p>
          <ul>
            <li>✓ Unlimited Invoices</li>
            <li>✓ Customer Management</li>
            <li>✓ Full Analytics</li>
          </ul>
          <button>Choose Plan</button>
        </div>
      </section>
    </main>
  );
}

export default Pricing;