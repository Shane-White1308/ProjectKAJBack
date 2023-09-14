const express = require("express");
const router = express.Router();

const { createValidator, updateValidator } = require("../validators/cart");

const {
    create,
    getUser,
    get,
    update,
    delete_,
} = require("../controllers/cart");

const { auth } = require("../middlewares/auth");

router.get("/", auth, getUser);
router.get("/:id", auth, get);

router.post("/", auth, createValidator, create);
router.post("/:id", auth, updateValidator, update);

router.delete("/:id", auth, delete_);

module.exports = router;
