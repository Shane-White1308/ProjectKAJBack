const express = require("express");
const router = express.Router();

const { addProductValidator } = require("../validators/image");

const {
    addProduct,
    getProduct,
    get,
    delete_,
} = require("../controllers/image");

const imageUploader = require("../middlewares/imageUploader");

router.get("/product/:id", getProduct);
router.get("/:id", get);

router.post("/product", imageUploader, addProductValidator, addProduct);

router.delete("/:id", delete_);

module.exports = router;
