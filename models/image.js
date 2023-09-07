const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
    filename: {
        type: "string",
        required: true,
    },
    ref: {
        type: "string",
        required: true,
    },
    isCover: {
        type: Boolean,
        required: true,
    },
    isModel: {
        type: Boolean,
        required: true,
    },
});

module.exports = mongoose.model("Image", imageSchema);
