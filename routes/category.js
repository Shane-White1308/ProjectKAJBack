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
router.get("/:id", get);
router.post("/update", updateValidator, update);
router.delete("/delete/:id", delete_);

module.exports = router;
