const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        pizza: {
            base: {
                type: String,
                required: true
            },

            sauce: {
                type: String,
                required: true
            },

            cheese: {
                type: String,
                required: true
            },

            vegetables: {
                type: [String],
                default: []
            }
        },

        quantity: {
            type: Number,
            default: 1,
            min: 1
        },

        totalPrice: {
            type: Number,
            required: true
        },

        status: {
            type: String,
            enum: [
                "Order Received",
                "Preparing",
                "Baking",
                "Out for Delivery",
                "Delivered"
            ],
            default: "Order Received"
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;