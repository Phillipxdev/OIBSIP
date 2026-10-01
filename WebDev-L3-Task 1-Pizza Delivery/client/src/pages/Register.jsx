import { useState } from "react";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
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
                "https://pizza-delivery-api-nm2d.onrender.com/api/auth/register",
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
                setMessage(data.message || "Registration successful!");

                setFormData({
                    name: "",
                    email: "",
                    password: ""
                });
            } else {
                setMessage(data.message || "Registration failed.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setMessage("Unable to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

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
                    minLength="6"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating Account..." : "Register"}
                </button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Register;