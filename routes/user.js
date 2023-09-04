const express = require("express");
const router = express.Router();

const {
    registerValidator
} = require("../validators/user");

const {
    register
} = require("../controllers/user");

router.post("/register", registerValidator, register);

module.exports = router;
