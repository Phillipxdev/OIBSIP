import { useState } from "react";

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((currentData) => ({
            ...currentData,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(
                "https://pizza-delivery-api-nm2d.onrender.com/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {
                // Save JWT token
                localStorage.setItem("token", data.token);

                // Save user information
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                setMessage("Login successful!");

                if (onLogin) {
                    onLogin();
                }
            } else {
                setMessage(data.message || "Login failed.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setMessage("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;