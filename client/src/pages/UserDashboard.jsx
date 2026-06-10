import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function UserDashboard() {
  const [invoices, setInvoices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchInvoices();
  }, []);

  async function fetchInvoices() {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/invoices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to fetch invoices");
        return;
      }

      setInvoices(Array.isArray(data) ? data : []);
    } catch (error) {
      alert("Server error while loading invoices");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setCustomerName("");
    setAmount("");
    setStatus("Pending");
    setDueDate("");
    setEditingInvoice(null);
    setShowModal(false);
  }

  function openCreateModal() {
    setCustomerName("");
    setAmount("");
    setStatus("Pending");
    setDueDate("");
    setEditingInvoice(null);
    setShowModal(true);
  }

  function openEditModal(invoice) {
    setEditingInvoice(invoice);
    setCustomerName(invoice.customerName);
    setAmount(invoice.amount);
    setStatus(invoice.status);
    setDueDate(invoice.dueDate ? invoice.dueDate.split("T")[0] : "");
    setShowModal(true);
  }

  async function handleSubmitInvoice(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const url = editingInvoice
      ? `${API_URL}/api/invoices/${editingInvoice._id}`
      : `${API_URL}/api/invoices`;

    const method = editingInvoice ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          customerName,
          amount,
          status,
          dueDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      resetForm();
      fetchInvoices();
    } catch (error) {
      alert("Server error. Please try again.");
    }
  }

  async function handleDeleteInvoice(id) {
    const confirmDelete = window.confirm("Delete this invoice?");
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/api/invoices/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to delete invoice");
        return;
      }

      fetchInvoices();
    } catch (error) {
      alert("Server error. Please try again.");
    }
  }

  const paidInvoices = invoices.filter(
    (invoice) => invoice.status === "Paid"
  ).length;

  const pendingInvoices = invoices.filter(
    (invoice) => invoice.status === "Pending"
  ).length;

  const totalRevenue = invoices.reduce(
    (total, invoice) => total + Number(invoice.amount || 0),
    0
  );

  return (
    <main className="page active">
      <section className="dashboard-container">
        <div className="dashboard-header">
          <div>
            <p className="welcome-label">BillFlow Dashboard</p>

            <h1 className="page-title">
              Welcome, {user?.name || "User"} 👋
            </h1>

            <p className="dashboard-subtitle">
              Manage your invoices, payments, and revenue in one place.
            </p>
          </div>

          <button className="primary-btn create-invoice-btn" onClick={openCreateModal}>
            + Create Invoice
          </button>
        </div>

        <section className="dashboard-grid">
          <div className="dash-card">
            <p>Total Invoices</p>
            <h2>{invoices.length}</h2>
          </div>

          <div className="dash-card">
            <p>Paid Invoices</p>
            <h2 className="success">{paidInvoices}</h2>
          </div>

          <div className="dash-card">
            <p>Pending Invoices</p>
            <h2>{pendingInvoices}</h2>
          </div>

          <div className="dash-card">
            <p>Total Revenue</p>
            <h2>₹{totalRevenue}</h2>
          </div>
        </section>

        <section className="table-card">
          <div className="table-header">
            <div>
              <h2>Invoice History</h2>
              <p>Track all created invoices here.</p>
            </div>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Amount</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        <h3>Loading invoices...</h3>
                      </div>
                    </td>
                  </tr>
                ) : invoices.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        <h3>📄 No invoices yet</h3>
                        <p>Create your first invoice to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  invoices.map((invoice) => (
                    <tr key={invoice._id}>
                      <td>{invoice.customerName}</td>
                      <td>₹{invoice.amount}</td>
                      <td>
                        {invoice.dueDate
                          ? new Date(invoice.dueDate).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <span
                          className={
                            invoice.status === "Paid"
                              ? "status-badge paid-badge"
                              : "status-badge pending-badge"
                          }
                        >
                          {invoice.status}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <button
                            className="edit-btn"
                            onClick={() => openEditModal(invoice)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteInvoice(invoice._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </section>

      {showModal && (
        <div className="modal-overlay">
          <form className="invoice-modal" onSubmit={handleSubmitInvoice}>
            <h2>{editingInvoice ? "Edit Invoice" : "Create Invoice"}</h2>

            <input
              type="text"
              placeholder="Customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
            </select>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />

            <div className="modal-actions">
              <button type="button" onClick={resetForm}>
                Cancel
              </button>

              <button className="primary-btn" type="submit">
                {editingInvoice ? "Update Invoice" : "Save Invoice"}
              </button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}

export default UserDashboard;