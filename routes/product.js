const express = require("express");
const router = express.Router();

const { createValidator } = require("../validators/product");

const { create } = require("../controllers/product");

router.post("/create", createValidator, create);

module.exports = router;
