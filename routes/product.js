const express = require("express");
const router = express.Router();

const { createValidator, searchValidator } = require("../validators/product");

const {
    create,
    get,
    getAll,
    search,
    getByCategory,
    getTop,
    update,
    delete_,
} = require("../controllers/product");

router.get("/", getAll);
router.get("/search", searchValidator, search);
router.get("/top", getTop);
router.get("/category/:id", getByCategory);
router.get("/:id", get);

router.post("/", createValidator, create);
router.post("/:id", update);

router.delete("/:id", delete_);

module.exports = router;
