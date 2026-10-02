function Home({
    onLogout,
    onBuildPizza,
    onViewOrders,
    onAdmin
}) {
    // Get logged-in user
    const user = JSON.parse(localStorage.getItem("user"));

    // Featured pizzas
    const pizzas = [
        {
            id: 1,
            image: "/images/pepperoni.png",
            name: "Margherita",
            description:
                "Classic tomato sauce, mozzarella cheese and fresh basil.",
            price: 89.99,
            tag: "Classic"
        },
        {
            id: 2,
            image: "/images/margherita.png",
            name: "Pepperoni",
            description:
                "Mozzarella, rich tomato sauce and crispy pepperoni.",
            price: 109.99,
            tag: "Popular"
        },
        {
            id: 3,
            image: "/images/bbq-chicken.webp",
            name: "BBQ Chicken",
            description:
                "Grilled chicken, smoky BBQ sauce, mozzarella and onion.",
            price: 119.99,
            tag: "Favourite"
        }
    ];

    return (
        <div className="home-page">

            {/* =========================
                HEADER
            ========================== */}

            <header className="home-header">

                <div className="brand">
                    <span className="brand-icon">
                        🍕
                    </span>

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


            {/* =========================
                MAIN
            ========================== */}

            <main className="home-main">


                {/* =========================
                    ACTION BAR
                ========================== */}

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


                {/* =========================
                    HERO
                ========================== */}

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
                            Fresh ingredients, bold flavours and
                            delicious pizza delivered straight to
                            your door. Choose one of our favourites
                            or build your own perfect pizza.
                        </p>

                        <button
                            className="hero-button"
                            onClick={onBuildPizza}
                        >
                            Build Your Pizza
                            <span> →</span>
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

                        <div className="floating-card rating-card">

                            <span>⭐</span>

                            <div>
                                <strong>
                                    Customer Favourite
                                </strong>

                                <small>
                                    Freshly prepared
                                </small>
                            </div>

                        </div>


                        <div className="floating-card delivery-card">

                            <span>🛵</span>

                            <div>
                                <strong>
                                    Fast Delivery
                                </strong>

                                <small>
                                    Hot & fresh
                                </small>
                            </div>

                        </div>

                    </div>

                </section>


                {/* =========================
                    BENEFITS
                ========================== */}

                <section className="benefits-section">

                    <div className="benefit">

                        <span className="benefit-icon">
                            🍅
                        </span>

                        <div>
                            <h3>Fresh Ingredients</h3>

                            <p>
                                Quality ingredients prepared
                                fresh for every order.
                            </p>
                        </div>

                    </div>


                    <div className="benefit">

                        <span className="benefit-icon">
                            👨‍🍳
                        </span>

                        <div>
                            <h3>Made to Order</h3>

                            <p>
                                Every pizza is prepared after
                                you place your order.
                            </p>
                        </div>

                    </div>


                    <div className="benefit">

                        <span className="benefit-icon">
                            🛵
                        </span>

                        <div>
                            <h3>Fast Delivery</h3>

                            <p>
                                Your pizza delivered hot and
                                fresh to your door.
                            </p>
                        </div>

                    </div>

                </section>


                {/* =========================
                    MENU
                ========================== */}

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
                                fresh ingredients and bold flavours.
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

                                {/* REAL PIZZA IMAGE */}

                                <div className="pizza-image">

                                    <img
                                        src={pizza.image}
                                        alt={pizza.name}
                                        loading="lazy"
                                    />

                                    <span className="pizza-tag">
                                        {pizza.tag}
                                    </span>

                                </div>


                                {/* PIZZA INFORMATION */}

                                <div className="pizza-card-content">

                                    <h3>
                                        {pizza.name}
                                    </h3>

                                    <p>
                                        {pizza.description}
                                    </p>


                                    <div className="pizza-card-footer">

                                        <div className="pizza-price">

                                            <small>
                                                From
                                            </small>

                                            <strong>
                                                R{pizza.price.toFixed(2)}
                                            </strong>

                                        </div>


                                        <button
                                            className="order-btn"
                                            onClick={onBuildPizza}
                                        >
                                            Order Now
                                        </button>

                                    </div>

                                </div>

                            </article>

                        ))}

                    </div>

                </section>


                {/* =========================
                    BUILD YOUR OWN PROMOTION
                ========================== */}

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
                            cheese and toppings to create your
                            own perfect pizza.
                        </p>

                    </div>


                    <button onClick={onBuildPizza}>
                        Start Building →
                    </button>

                </section>


                {/* =========================
                    HOW IT WORKS
                ========================== */}

                <section className="how-section">

                    <div className="how-heading">

                        <span className="section-label">
                            HOW IT WORKS
                        </span>

                        <h2>
                            Pizza in three simple steps
                        </h2>

                    </div>


                    <div className="steps-grid">

                        <div className="step-card">

                            <span className="step-number">
                                01
                            </span>

                            <div className="step-icon">
                                🍕
                            </div>

                            <h3>
                                Choose Your Pizza
                            </h3>

                            <p>
                                Pick a customer favourite or
                                create your own pizza.
                            </p>

                        </div>


                        <div className="step-card">

                            <span className="step-number">
                                02
                            </span>

                            <div className="step-icon">
                                🧾
                            </div>

                            <h3>
                                Place Your Order
                            </h3>

                            <p>
                                Confirm your pizza and submit
                                your order.
                            </p>

                        </div>


                        <div className="step-card">

                            <span className="step-number">
                                03
                            </span>

                            <div className="step-icon">
                                🛵
                            </div>

                            <h3>
                                Track Your Order
                            </h3>

                            <p>
                                Check My Orders to follow the
                                progress of your pizza.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =========================
                    ORDER CTA
                ========================== */}

                <section className="order-cta">

                    <div>

                        <span className="section-label">
                            HUNGRY?
                        </span>

                        <h2>
                            Your next pizza is only
                            a few clicks away.
                        </h2>

                        <p>
                            Start building your perfect pizza
                            and place your order today.
                        </p>

                    </div>


                    <button
                        onClick={onBuildPizza}
                    >
                        Order Pizza →
                    </button>

                </section>

            </main>


            {/* =========================
                FOOTER
            ========================== */}

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


                <div className="footer-links">

                    <button onClick={onBuildPizza}>
                        Build Pizza
                    </button>

                    <button onClick={onViewOrders}>
                        My Orders
                    </button>

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