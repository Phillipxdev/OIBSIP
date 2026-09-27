import { useState } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PizzaBuilder from "./pages/PizzaBuilder";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
    const [page, setPage] = useState(
        localStorage.getItem("token") ? "home" : "login"
    );

    // LOGIN
    const handleLogin = () => {
        setPage("home");
    };

    // LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setPage("login");
    };

    return (
        <div>

            {/* =========================
                HOME
            ========================== */}
            {page === "home" && (
                <Home
                    onLogout={handleLogout}
                    onBuildPizza={() => setPage("builder")}
                    onViewOrders={() => setPage("orders")}
                    onAdmin={() => setPage("admin")}
                />
            )}

            {/* =========================
                PIZZA BUILDER
            ========================== */}
            {page === "builder" && (
                <PizzaBuilder
                    onBack={() => setPage("home")}
                />
            )}

            {/* =========================
                MY ORDERS
            ========================== */}
            {page === "orders" && (
                <MyOrders
                    onBack={() => setPage("home")}
                />
            )}

            {/* =========================
                ADMIN DASHBOARD
            ========================== */}
            {page === "admin" && (
                <AdminDashboard
                    onBack={() => setPage("home")}
                />
            )}

            {/* =========================
                LOGIN / REGISTER
            ========================== */}
            {page !== "home" &&
                page !== "builder" &&
                page !== "orders" &&
                page !== "admin" && (
                    <>
                        <nav>
                            <button
                                onClick={() =>
                                    setPage("login")
                                }
                            >
                                Login
                            </button>

                            <button
                                onClick={() =>
                                    setPage("register")
                                }
                            >
                                Register
                            </button>
                        </nav>

                        {page === "login" && (
                            <Login
                                onLogin={handleLogin}
                            />
                        )}

                        {page === "register" && (
                            <Register />
                        )}
                    </>
                )}

        </div>
    );
}

export default App;