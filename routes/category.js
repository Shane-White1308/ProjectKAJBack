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

router.get("/", getAll);
router.get("/:id", get);

router.post("/", createValidator, create);
router.post("/:id", updateValidator, update);

router.delete("/:id", delete_);

module.exports = router;
