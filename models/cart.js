const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
    product: {
        type: Schema.ObjectId,
        ref: "Product",
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Cart", cartSchema);
