import { useState } from "react";

function PizzaBuilder({ onBack }) {
    const [pizza, setPizza] = useState({
        base: "",
        sauce: "",
        cheese: "",
        vegetables: []
    });

    const bases = [
        "Classic",
        "Thin Crust",
        "Pan",
        "Whole Wheat",
        "Gluten Free"
    ];

    const sauces = [
        "Tomato",
        "BBQ",
        "Peri-Peri",
        "Garlic",
        "Sweet Chilli"
    ];

    const cheeses = [
        "Mozzarella",
        "Cheddar",
        "Parmesan",
        "Gouda"
    ];

    const vegetables = [
        "Onion",
        "Mushroom",
        "Green Pepper",
        "Olives",
        "Tomato",
        "Jalapeño"
    ];

    const handleVegetableChange = (vegetable) => {
        setPizza((currentPizza) => {
            const selected =
                currentPizza.vegetables.includes(vegetable);

            return {
                ...currentPizza,
                vegetables: selected
                    ? currentPizza.vegetables.filter(
                          (item) => item !== vegetable
                      )
                    : [...currentPizza.vegetables, vegetable]
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!pizza.base || !pizza.sauce || !pizza.cheese) {
            alert("Please choose a base, sauce and cheese.");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login before placing an order.");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        pizza,
                        quantity: 1,
                        totalPrice: 129.99
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Order placed successfully! 🍕");

                setPizza({
                    base: "",
                    sauce: "",
                    cheese: "",
                    vegetables: []
                });
            } else {
                alert(
                    data.message ||
                    "Unable to place order."
                );
            }

        } catch (error) {
            console.error(error);

            alert("Unable to connect to the server.");
        }
    };

    return (
        <main>

            <button type="button" onClick={onBack}>
                ← Back
            </button>

            <h1>Build Your Pizza 🍕</h1>

            <form onSubmit={handleSubmit}>

                <section>
                    <h2>Step 1: Choose a Base</h2>

                    {bases.map((base) => (
                        <label key={base}>
                            <input
                                type="radio"
                                name="base"
                                value={base}
                                checked={pizza.base === base}
                                onChange={(e) =>
                                    setPizza({
                                        ...pizza,
                                        base: e.target.value
                                    })
                                }
                            />

                            {base}
                        </label>
                    ))}
                </section>

                <section>
                    <h2>Step 2: Choose a Sauce</h2>

                    {sauces.map((sauce) => (
                        <label key={sauce}>
                            <input
                                type="radio"
                                name="sauce"
                                value={sauce}
                                checked={pizza.sauce === sauce}
                                onChange={(e) =>
                                    setPizza({
                                        ...pizza,
                                        sauce: e.target.value
                                    })
                                }
                            />

                            {sauce}
                        </label>
                    ))}
                </section>

                <section>
                    <h2>Step 3: Choose Cheese</h2>

                    {cheeses.map((cheese) => (
                        <label key={cheese}>
                            <input
                                type="radio"
                                name="cheese"
                                value={cheese}
                                checked={pizza.cheese === cheese}
                                onChange={(e) =>
                                    setPizza({
                                        ...pizza,
                                        cheese: e.target.value
                                    })
                                }
                            />

                            {cheese}
                        </label>
                    ))}
                </section>

                <section>
                    <h2>Step 4: Choose Vegetables</h2>

                    {vegetables.map((vegetable) => (
                        <label key={vegetable}>
                            <input
                                type="checkbox"
                                checked={pizza.vegetables.includes(
                                    vegetable
                                )}
                                onChange={() =>
                                    handleVegetableChange(
                                        vegetable
                                    )
                                }
                            />

                            {vegetable}
                        </label>
                    ))}
                </section>

                <section>
                    <h2>Your Pizza</h2>

                    <p>
                        <strong>Base:</strong>{" "}
                        {pizza.base || "Not selected"}
                    </p>

                    <p>
                        <strong>Sauce:</strong>{" "}
                        {pizza.sauce || "Not selected"}
                    </p>

                    <p>
                        <strong>Cheese:</strong>{" "}
                        {pizza.cheese || "Not selected"}
                    </p>

                    <p>
                        <strong>Vegetables:</strong>{" "}
                        {pizza.vegetables.length > 0
                            ? pizza.vegetables.join(", ")
                            : "None"}
                    </p>

                    <p>
                        <strong>Total:</strong> R129.99
                    </p>
                </section>

                <button type="submit">
                    Place Order 🍕
                </button>

            </form>

        </main>
    );
}

export default PizzaBuilder;