const express = require("express");
const jwt = require("jsonwebtoken");
const Order = require("../models/Order");

const router = express.Router();


// ======================================================
// AUTHENTICATION MIDDLEWARE
// ======================================================
const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Access denied. No token provided."
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token."
        });
    }
};


// ======================================================
// ADMIN AUTHORIZATION MIDDLEWARE
// ======================================================
const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required."
        });
    }

    next();
};


// ======================================================
// CUSTOMER - CREATE ORDER
// POST /api/orders
// ======================================================
router.post(
    "/",
    authenticateUser,
    async (req, res) => {
        try {
            const {
                pizza,
                quantity = 1,
                totalPrice
            } = req.body;

            // Validate pizza
            if (
                !pizza ||
                !pizza.base ||
                !pizza.sauce ||
                !pizza.cheese
            ) {
                return res.status(400).json({
                    message:
                        "Please choose a base, sauce and cheese."
                });
            }

            // Validate quantity
            if (
                !Number.isInteger(quantity) ||
                quantity < 1
            ) {
                return res.status(400).json({
                    message: "Invalid quantity."
                });
            }

            // Validate price
            if (
                typeof totalPrice !== "number" ||
                totalPrice <= 0
            ) {
                return res.status(400).json({
                    message: "Invalid order price."
                });
            }

            // Create order
            const order = new Order({
                user: req.user.id,

                pizza: {
                    base: pizza.base,
                    sauce: pizza.sauce,
                    cheese: pizza.cheese,
                    vegetables:
                        Array.isArray(pizza.vegetables)
                            ? pizza.vegetables
                            : []
                },

                quantity,
                totalPrice
            });

            await order.save();

            res.status(201).json({
                message: "Order placed successfully.",
                order
            });

        } catch (error) {
            console.error(
                "Create order error:",
                error
            );

            res.status(500).json({
                message: "Server error."
            });
        }
    }
);


// ======================================================
// CUSTOMER - GET OWN ORDERS
// GET /api/orders/my-orders
// ======================================================
router.get(
    "/my-orders",
    authenticateUser,
    async (req, res) => {
        try {
            const orders = await Order.find({
                user: req.user.id
            }).sort({
                createdAt: -1
            });

            res.status(200).json(orders);

        } catch (error) {
            console.error(
                "Get customer orders error:",
                error
            );

            res.status(500).json({
                message: "Server error."
            });
        }
    }
);


// ======================================================
// ADMIN - GET ALL ORDERS
// GET /api/orders
// ======================================================
router.get(
    "/",
    authenticateUser,
    authorizeAdmin,
    async (req, res) => {
        try {
            const orders = await Order.find()
                .populate(
                    "user",
                    "name email"
                )
                .sort({
                    createdAt: -1
                });

            res.status(200).json(orders);

        } catch (error) {
            console.error(
                "Get all orders error:",
                error
            );

            res.status(500).json({
                message: "Server error."
            });
        }
    }
);


// ======================================================
// ADMIN - UPDATE ORDER STATUS
// PUT /api/orders/:id/status
// ======================================================
router.put(
    "/:id/status",
    authenticateUser,
    authorizeAdmin,
    async (req, res) => {
        try {
            const { status } = req.body;

            const allowedStatuses = [
                "Order Received",
                "Preparing",
                "Baking",
                "Out for Delivery",
                "Delivered"
            ];

            // Validate status
            if (!allowedStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid order status."
                });
            }

            // Find order
            const order = await Order.findById(
                req.params.id
            );

            if (!order) {
                return res.status(404).json({
                    message: "Order not found."
                });
            }

            // Update status
            order.status = status;

            await order.save();

            res.status(200).json({
                message:
                    "Order status updated successfully.",
                order
            });

        } catch (error) {
            console.error(
                "Update order status error:",
                error
            );

            res.status(500).json({
                message: "Server error."
            });
        }
    }
);


module.exports = router;