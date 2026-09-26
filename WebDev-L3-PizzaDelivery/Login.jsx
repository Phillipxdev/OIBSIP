import { useState } from "react";

function Login({ onLogin }) {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/login",
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

                setMessage("Login successful");

                onLogin();
                
            } else {
                setMessage(data.message);
            }

        } catch (error) {
            setMessage("Unable to connect to server");
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

                <button type="submit">
                    Login
                </button>

            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;