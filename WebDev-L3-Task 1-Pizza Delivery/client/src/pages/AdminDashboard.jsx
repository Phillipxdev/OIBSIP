import { useEffect, useState } from "react";

function AdminDashboard({ onBack }) {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const statuses = [
        "Order Received",
        "Preparing",
        "Baking",
        "Out for Delivery",
        "Delivered"
    ];

    // Get all customer orders
    const fetchOrders = async () => {
        const token = localStorage.getItem("token");

        setLoading(true);

        try {
            const response = await fetch(
                "https://pizza-delivery-api-nm2d.onrender.com/api/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (response.ok) {
                setOrders(data);
                setMessage("");
            } else {
                setMessage(
                    data.message || "Unable to load orders."
                );
            }
        } catch (error) {
            console.error(error);

            setMessage(
                "Unable to connect to the server."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // Update order status
    const updateStatus = async (orderId, newStatus) => {
        const token = localStorage.getItem("token");

        setUpdatingId(orderId);
        setMessage("");

        try {
            const response = await fetch(
                `https://pizza-delivery-api-nm2d.onrender.com/api/orders/${orderId}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        status: newStatus
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                setOrders((currentOrders) =>
                    currentOrders.map((order) =>
                        order._id === orderId
                            ? {
                                  ...order,
                                  status: newStatus
                              }
                            : order
                    )
                );

                setMessage(
                    "Order status updated successfully."
                );
            } else {
                setMessage(
                    data.message ||
                        "Unable to update order."
                );
            }
        } catch (error) {
            console.error(error);

            setMessage(
                "Unable to connect to the server."
            );
        } finally {
            setUpdatingId(null);
        }
    };

    // Dashboard statistics
    const totalOrders = orders.length;

    const activeOrders = orders.filter(
        (order) => order.status !== "Delivered"
    ).length;

    const deliveredOrders = orders.filter(
        (order) => order.status === "Delivered"
    ).length;

    const totalRevenue = orders.reduce(
        (total, order) =>
            total + Number(order.totalPrice || 0),
        0
    );

    // Status CSS class
    const getStatusClass = (status) => {
        return status
            ?.toLowerCase()
            .replaceAll(" ", "-");
    };

    return (
        <main className="admin-dashboard">

            {/* Header */}

            <div className="admin-topbar">

                <div>
                    <span className="admin-label">
                        ADMIN PANEL
                    </span>

                    <h1>Pizza Orders 🍕</h1>

                    <p>
                        Manage and track customer orders
                        from one place.
                    </p>
                </div>

                <button
                    className="back-btn"
                    onClick={onBack}
                >
                    ← Back to Home
                </button>

            </div>


            {/* Dashboard Stats */}

            <section className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon">
                        📦
                    </div>

                    <div>
                        <span>Total Orders</span>

                        <strong>
                            {totalOrders}
                        </strong>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon">
                        🔥
                    </div>

                    <div>
                        <span>Active Orders</span>

                        <strong>
                            {activeOrders}
                        </strong>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon">
                        ✅
                    </div>

                    <div>
                        <span>Delivered</span>

                        <strong>
                            {deliveredOrders}
                        </strong>
                    </div>
                </div>


                <div className="stat-card">
                    <div className="stat-icon">
                        💰
                    </div>

                    <div>
                        <span>Total Revenue</span>

                        <strong>
                            R{totalRevenue.toFixed(2)}
                        </strong>
                    </div>
                </div>

            </section>


            {/* Message */}

            {message && (
                <div
                    className={
                        message.includes("successfully")
                            ? "admin-message success"
                            : "admin-message error"
                    }
                >
                    {message}
                </div>
            )}


            {/* Orders Header */}

            <div className="orders-heading">

                <div>
                    <h2>Customer Orders</h2>

                    <p>
                        {totalOrders}{" "}
                        {totalOrders === 1
                            ? "order"
                            : "orders"}{" "}
                        available
                    </p>
                </div>

                <button
                    className="refresh-btn"
                    onClick={fetchOrders}
                    disabled={loading}
                >
                    ↻ {loading ? "Loading..." : "Refresh"}
                </button>

            </div>


            {/* Loading */}

            {loading && (
                <div className="loading-state">

                    <div className="spinner"></div>

                    <h3>Loading orders...</h3>

                    <p>
                        Fetching the latest customer orders.
                    </p>

                </div>
            )}


            {/* Empty State */}

            {!loading && orders.length === 0 && (
                <div className="empty-state">

                    <div className="empty-icon">
                        🍕
                    </div>

                    <h2>No Orders Yet</h2>

                    <p>
                        Customer orders will appear here
                        once they start ordering.
                    </p>

                </div>
            )}


            {/* Orders */}

            {!loading && orders.length > 0 && (

                <div className="orders-list">

                    {orders.map((order, index) => (

                        <article
                            className="admin-order-card"
                            key={order._id}
                        >

                            {/* Order Header */}

                            <div className="order-card-header">

                                <div>
                                    <span className="order-number">
                                        ORDER #{index + 1}
                                    </span>

                                    <h2>
                                        {order.user?.name ||
                                            "Customer"}
                                    </h2>

                                    <span className="customer-email">
                                        {order.user?.email ||
                                            "Email not available"}
                                    </span>
                                </div>


                                <span
                                    className={`status-badge ${getStatusClass(
                                        order.status
                                    )}`}
                                >
                                    {order.status}
                                </span>

                            </div>


                            {/* Pizza Details */}

                            <div className="order-details-grid">

                                <div className="detail-item">
                                    <span>🍕 Base</span>

                                    <strong>
                                        {order.pizza?.base ||
                                            "Not selected"}
                                    </strong>
                                </div>


                                <div className="detail-item">
                                    <span>🥫 Sauce</span>

                                    <strong>
                                        {order.pizza?.sauce ||
                                            "Not selected"}
                                    </strong>
                                </div>


                                <div className="detail-item">
                                    <span>🧀 Cheese</span>

                                    <strong>
                                        {order.pizza?.cheese ||
                                            "Not selected"}
                                    </strong>
                                </div>


                                <div className="detail-item">
                                    <span>🥬 Vegetables</span>

                                    <strong>
                                        {order.pizza?.vegetables
                                            ?.length > 0
                                            ? order.pizza.vegetables.join(
                                                  ", "
                                              )
                                            : "None"}
                                    </strong>
                                </div>


                                <div className="detail-item">
                                    <span>📦 Quantity</span>

                                    <strong>
                                        {order.quantity || 1}
                                    </strong>
                                </div>


                                <div className="detail-item total-detail">
                                    <span>💰 Total</span>

                                    <strong>
                                        R
                                        {Number(
                                            order.totalPrice || 0
                                        ).toFixed(2)}
                                    </strong>
                                </div>

                            </div>


                            {/* Status Management */}

                            <div className="status-management">

                                <div>
                                    <label
                                        htmlFor={`status-${order._id}`}
                                    >
                                        Update Order Status
                                    </label>

                                    <p>
                                        Change the customer's
                                        delivery progress.
                                    </p>
                                </div>


                                <select
                                    id={`status-${order._id}`}
                                    value={order.status}
                                    disabled={
                                        updatingId === order._id
                                    }
                                    onChange={(e) =>
                                        updateStatus(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                >
                                    {statuses.map((status) => (
                                        <option
                                            key={status}
                                            value={status}
                                        >
                                            {status}
                                        </option>
                                    ))}
                                </select>

                            </div>


                            {updatingId === order._id && (
                                <p className="updating-text">
                                    Updating order...
                                </p>
                            )}

                        </article>

                    ))}

                </div>

            )}

        </main>
    );
}

export default AdminDashboard;