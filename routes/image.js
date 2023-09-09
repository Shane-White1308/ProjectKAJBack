const express = require("express");
const router = express.Router();

const { addProductValidator } = require("../validators/image");

const { addProduct, getProduct } = require("../controllers/image");

const imageUploader = require("../middlewares/imageUploader");

router.post("/product", imageUploader, addProductValidator, addProduct);
router.get("/product/:id", getProduct);

module.exports = router;
