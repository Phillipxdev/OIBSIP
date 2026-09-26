import { useEffect, useState } from "react";

function AdminDashboard({ onBack }) {
    const [orders, setOrders] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const statuses = [
        "Order Received",
        "Preparing",
        "Baking",
        "Out for Delivery",
        "Delivered"
    ];

    const fetchOrders = async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                "http://localhost:5000/api/orders",
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
            setMessage("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(
                `http://localhost:5000/api/orders/${orderId}/status`,
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
        }
    };

    return (
        <main>
            <button onClick={onBack}>
                ← Back
            </button>

            <h1>Admin Dashboard 🍕</h1>

            <p>Manage customer pizza orders.</p>

            {message && <p>{message}</p>}

            {loading && <p>Loading orders...</p>}

            {!loading && orders.length === 0 && (
                <p>No orders available.</p>
            )}

            {orders.map((order) => (
                <div key={order._id}>

                    <h2>Customer Order</h2>

                    <p>
                        <strong>Customer:</strong>{" "}
                        {order.user?.name || "Customer"}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {order.user?.email || "Not available"}
                    </p>

                    <p>
                        <strong>Base:</strong>{" "}
                        {order.pizza.base}
                    </p>

                    <p>
                        <strong>Sauce:</strong>{" "}
                        {order.pizza.sauce}
                    </p>

                    <p>
                        <strong>Cheese:</strong>{" "}
                        {order.pizza.cheese}
                    </p>

                    <p>
                        <strong>Vegetables:</strong>{" "}
                        {order.pizza.vegetables.length > 0
                            ? order.pizza.vegetables.join(", ")
                            : "None"}
                    </p>

                    <p>
                        <strong>Quantity:</strong>{" "}
                        {order.quantity}
                    </p>

                    <p>
                        <strong>Total:</strong>{" "}
                        R{order.totalPrice.toFixed(2)}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {order.status}
                    </p>

                    <label>
                        <strong>Update Status:</strong>
                    </label>

                    <select
                        value={order.status}
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
            ))}
        </main>
    );
}

export default AdminDashboard;