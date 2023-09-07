const express = require("express");
const router = express.Router();

const {
    createValidator,
    updateValidator,
    deleteValidator,
} = require("../validators/category");

const { create, getAll, update, delete_ } = require("../controllers/category");

router.post("/create", createValidator, create);
router.get("/", getAll);
router.post("/update", updateValidator, update);
router.post("/delete", deleteValidator, delete_);

module.exports = router;
