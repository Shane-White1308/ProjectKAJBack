const express = require("express");
const router = express.Router();

const {
    registerValidator,
    loginValidator,
    authGoogleValidator,
    resetPasswordInitValidator,
    resetPasswordValidator,
} = require("../validators/user");

const {
    register,
    login,
    authGoogle,
    resetPasswordInit,
    resetPassword,
    get,
    getOther,
    logout,
} = require("../controllers/user");

const { auth } = require("../middlewares/auth");

router.get("/", auth, get);
router.get("/:id", getOther);
router.get("/logout", auth, logout);

router.post("/auth/register", registerValidator, register);
router.post("/auth/login", loginValidator, login);
router.post("/auth/google", authGoogleValidator, authGoogle);
router.post(
    "/reset/password/init",
    resetPasswordInitValidator,
    resetPasswordInit
);
router.post("/reset/password", resetPasswordValidator, resetPassword);

module.exports = router;
