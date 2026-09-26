import { useEffect, useState } from "react";

function MyOrders({ onBack }) {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                setMessage("Please login to view your orders.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/api/orders/my-orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    setOrders(data);
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

        fetchOrders();
    }, []);

    const getStatusNumber = (status) => {
        const statuses = [
            "Order Received",
            "Preparing",
            "Baking",
            "Out for Delivery",
            "Delivered"
        ];

        return statuses.indexOf(status);
    };

    return (
        <main>
            <button onClick={onBack}>
                ← Back
            </button>

            <h1>My Orders 🍕</h1>

            {loading && <p>Loading orders...</p>}

            {message && <p>{message}</p>}

            {!loading &&
                !message &&
                orders.length === 0 && (
                    <p>You have no orders yet.</p>
                )}

            {orders.map((order) => (
                <div key={order._id}>
                    <hr />

                    <h2>Order</h2>

                    <p>
                        <strong>Status:</strong>{" "}
                        {order.status}
                    </p>

                    <div>
                        {[
                            "Order Received",
                            "Preparing",
                            "Baking",
                            "Out for Delivery",
                            "Delivered"
                        ].map((status, index) => (
                            <div key={status}>
                                <span>
                                    {index <= getStatusNumber(order.status)
                                        ? "✅"
                                        : "⬜"}
                                </span>

                                <span> {status}</span>
                            </div>
                        ))}
                    </div>

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
                        <strong>Ordered:</strong>{" "}
                        {new Date(
                            order.createdAt
                        ).toLocaleString()}
                    </p>
                </div>
            ))}
        </main>
    );
}

export default MyOrders;