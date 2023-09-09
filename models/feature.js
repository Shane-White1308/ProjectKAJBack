const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const featureSchema = new mongoose.Schema({
    product: {
        type: Schema.ObjectId,
        ref: "Product",
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

module.exports = mongoose.model("Feature", featureSchema);
