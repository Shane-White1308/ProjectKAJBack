const express = require("express");
const router = express.Router();

const { addProductValidator } = require("../validators/image");

const { addProduct } = require("../controllers/image");

const imageUploader = require("../middlewares/imageUploader");

router.post("/product/add", imageUploader, addProductValidator, addProduct);

module.exports = router;
