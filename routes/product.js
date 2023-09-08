const express = require("express");
const router = express.Router();

const { createValidator, searchValidator } = require("../validators/product");

const {
    create,
    get,
    getAll,
    search,
    getByCategory,
    update,
    delete_,
} = require("../controllers/product");

router.post("/create", createValidator, create);
router.get("/", getAll);
router.get("/search", searchValidator, search);
router.get("/category/:id", getByCategory);
router.post("/update/:id", update);
router.delete("/delete/:id", delete_);
router.get("/:id", get);

module.exports = router;
