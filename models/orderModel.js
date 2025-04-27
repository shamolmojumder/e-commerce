import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.ObjectId,
            ref: "Products",
        },
    ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "users"
    },
    // price: {
    //     type: Number, // Store the price at the time of the order
    //     required: true,
    // },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"]
    },
}, { timestamps: true })
export default mongoose.model("Order", orderSchema)