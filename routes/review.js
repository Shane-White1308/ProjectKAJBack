const express = require("express");
const router = express.Router();

const { createValidator } = require("../validators/review");

const {
    create,
    getProduct,
    getUser,
    get,
    summary,
    update,
    delete_,
} = require("../controllers/review");

const { auth } = require("../middlewares/auth");

router.get("/product/:id/summary", summary);
router.get("/product/:id", getProduct);
router.get("/user/:id", getUser);
router.get("/:id", get);

router.post("/", auth, createValidator, create);
router.post("/:id", auth, update);

router.delete("/:id", auth, delete_);

module.exports = router;
