const express = require("express");
const router = express.Router();

const { createValidator, updateValidator } = require("../validators/category");

const {
    create,
    getAll,
    get,
    update,
    delete_,
} = require("../controllers/category");

router.post("/create", createValidator, create);
router.get("/", getAll);
router.post("/update/:id", updateValidator, update);
router.delete("/delete/:id", delete_);
router.get("/:id", get);

module.exports = router;
