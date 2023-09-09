const express = require("express");
const router = express.Router();

const { createValidator } = require("../validators/feature");

const {
    create,
    getProduct,
    get,
    update,
    delete_,
} = require("../controllers/feature");

router.get("/product/:id", getProduct);
router.get("/:id", get);

router.post("/", createValidator, create);
router.post("/:id", update);

router.delete("/:id", delete_);

module.exports = router;
