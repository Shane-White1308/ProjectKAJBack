const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
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
    rating: {
        type: Number,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Review", reviewSchema);
