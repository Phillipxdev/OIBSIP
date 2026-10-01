function Home({
    onLogout,
    onBuildPizza,
    onViewOrders,
    onAdmin
}) {
    const user = JSON.parse(localStorage.getItem("user"));

    const pizzas = [
        {
            id: 1,
            emoji: "🍕",
            name: "Margherita",
            description:
                "Classic tomato sauce, mozzarella cheese and fresh basil.",
            price: 89.99,
            tag: "Classic"
        },
        {
            id: 2,
            emoji: "🍕",
            name: "Pepperoni",
            description:
                "Mozzarella, rich tomato sauce and crispy pepperoni.",
            price: 109.99,
            tag: "Popular"
        },
        {
            id: 3,
            emoji: "🍕",
            name: "BBQ Chicken",
            description:
                "Grilled chicken, smoky BBQ sauce, mozzarella and onion.",
            price: 119.99,
            tag: "Favourite"
        }
    ];

    return (
        <div className="home-page">

            {/* ================= HEADER ================= */}

            <header className="home-header">
                <div className="brand">
                    <span className="brand-icon">🍕</span>

                    <div>
                        <h1>Pizza Delivery</h1>
                        <small>Hot. Fresh. Fast.</small>
                    </div>
                </div>

                <div className="user-area">
                    <span className="welcome-text">
                        Welcome,{" "}
                        <strong>
                            {user?.name || "Customer"}
                        </strong>
                    </span>

                    <button
                        className="logout-btn"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                </div>
            </header>


            {/* ================= MAIN ================= */}

            <main className="home-main">

                {/* Navigation Actions */}

                <section className="action-bar">

                    <button
                        className="action-btn primary-action"
                        onClick={onBuildPizza}
                    >
                        <span>🍕</span>
                        Build Your Pizza
                    </button>

                    <button
                        className="action-btn secondary-action"
                        onClick={onViewOrders}
                    >
                        <span>📦</span>
                        My Orders
                    </button>

                    {user?.role === "admin" && (
                        <button
                            className="action-btn admin-action"
                            onClick={onAdmin}
                        >
                            <span>⚙️</span>
                            Admin Dashboard
                        </button>
                    )}

                </section>


                {/* ================= HERO ================= */}

                <section className="hero-section">

                    <div className="hero-content">

                        <span className="hero-badge">
                            🔥 Freshly baked every day
                        </span>

                        <h2>
                            Delicious Pizza,
                            <span> Delivered Fast.</span>
                        </h2>

                        <p>
                            Build your perfect pizza or choose
                            one of our favourites. Fresh ingredients,
                            amazing flavour and fast delivery straight
                            to your door.
                        </p>

                        <button
                            className="hero-button"
                            onClick={onBuildPizza}
                        >
                            Build Your Pizza
                            <span>→</span>
                        </button>

                        <div className="hero-features">

                            <span>
                                ✓ Fresh Ingredients
                            </span>

                            <span>
                                ✓ Fast Delivery
                            </span>

                            <span>
                                ✓ Made to Order
                            </span>

                        </div>

                    </div>


                    <div className="hero-visual">

                        <div className="pizza-circle">
                            🍕
                        </div>

                        <div className="floating-card delivery-card">
                            <span>🛵</span>

                            <div>
                                <strong>Fast Delivery</strong>
                                <small>Hot & fresh</small>
                            </div>
                        </div>

                        <div className="floating-card rating-card">
                            <span>⭐</span>

                            <div>
                                <strong>4.9 Rating</strong>
                                <small>Happy customers</small>
                            </div>
                        </div>

                    </div>

                </section>


                {/* ================= MENU ================= */}

                <section className="menu-section">

                    <div className="section-heading">

                        <div>
                            <span className="section-label">
                                OUR MENU
                            </span>

                            <h2>
                                Customer Favourites
                            </h2>

                            <p>
                                Delicious pizzas prepared with
                                fresh ingredients.
                            </p>
                        </div>

                        <button
                            className="build-small-btn"
                            onClick={onBuildPizza}
                        >
                            Create Your Own →
                        </button>

                    </div>


                    <div className="pizza-grid">

                        {pizzas.map((pizza) => (

                            <article
                                className="pizza-card"
                                key={pizza.id}
                            >

                                <div className="pizza-image">

                                    <span className="pizza-emoji">
                                        {pizza.emoji}
                                    </span>

                                    <span className="pizza-tag">
                                        {pizza.tag}
                                    </span>

                                </div>


                                <div className="pizza-card-content">

                                    <h3>
                                        {pizza.name}
                                    </h3>

                                    <p>
                                        {pizza.description}
                                    </p>


                                    <div className="pizza-card-footer">

                                        <div className="pizza-price">
                                            <small>From</small>

                                            <strong>
                                                R{pizza.price.toFixed(2)}
                                            </strong>
                                        </div>


                                        <button
                                            onClick={onBuildPizza}
                                            className="order-btn"
                                        >
                                            Order Now
                                        </button>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                </section>


                {/* ================= PROMO ================= */}

                <section className="promo-section">

                    <div>
                        <span className="promo-label">
                            BUILD IT YOUR WAY
                        </span>

                        <h2>
                            Your Pizza. Your Rules. 🍕
                        </h2>

                        <p>
                            Choose your size, crust, sauce,
                            cheese and toppings to create the
                            perfect pizza.
                        </p>
                    </div>

                    <button onClick={onBuildPizza}>
                        Start Building →
                    </button>

                </section>

            </main>


            {/* ================= FOOTER ================= */}

            <footer className="home-footer">

                <div className="footer-brand">
                    <strong>
                        🍕 Pizza Delivery
                    </strong>

                    <p>
                        Fresh pizza delivered straight
                        to your door.
                    </p>
                </div>

                <p className="copyright">
                    © {new Date().getFullYear()} Pizza Delivery.
                    All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default Home;