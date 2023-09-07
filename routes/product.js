const express = require("express");
const router = express.Router();

const {
    createValidator,
    createImageValidator,
} = require("../validators/product");

const { create, createImage } = require("../controllers/product");

const imageUploader = require("../middlewares/imageUploader");

router.post("/create", createValidator, create);
router.post("/image/create", imageUploader, createImageValidator, createImage);

module.exports = router;
