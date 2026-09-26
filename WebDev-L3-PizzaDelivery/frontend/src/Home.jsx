function Home({
    onLogout,
    onBuildPizza,
    onViewOrders,
    onAdmin
}) {
    const user = JSON.parse(
        localStorage.getItem("user")
    );

    return (
        <div>
            <header>
                <h1>🍕 Pizza Delivery</h1>

                <div>
                    <span>
                        Welcome, {user?.name || "Customer"}
                    </span>

                    <button onClick={onLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <main>

                <button onClick={onBuildPizza}>
                    Build Your Own Pizza 🍕
                </button>

                <button onClick={onViewOrders}>
                    My Orders
                </button>

                {/* Only admins can see this button */}
                {user?.role === "admin" && (
                    <button onClick={onAdmin}>
                        Admin Dashboard
                    </button>
                )}

                <h2>
                    Fresh Pizza Delivered To Your Door
                </h2>

                <p>
                    Choose your favourite pizza and place
                    your order.
                </p>

                <h2>Our Menu</h2>

                <div>
                    <h3>Margherita</h3>

                    <p>
                        Tomato sauce, mozzarella and basil
                    </p>

                    <strong>R89.99</strong>

                    <br />

                    <button>
                        Add to Cart
                    </button>
                </div>

                <div>
                    <h3>Pepperoni</h3>

                    <p>
                        Mozzarella, tomato sauce and
                        pepperoni
                    </p>

                    <strong>R109.99</strong>

                    <br />

                    <button>
                        Add to Cart
                    </button>
                </div>

                <div>
                    <h3>BBQ Chicken</h3>

                    <p>
                        Chicken, BBQ sauce, mozzarella
                        and onion
                    </p>

                    <strong>R119.99</strong>

                    <br />

                    <button>
                        Add to Cart
                    </button>
                </div>

            </main>
        </div>
    );
}

export default Home;