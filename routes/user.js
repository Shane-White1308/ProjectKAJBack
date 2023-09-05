const express = require("express");
const router = express.Router();

const {
    registerValidator,
    loginValidator,
    authGoogleValidator,
    resetPasswordInitValidator,
    resetPasswordValidator
} = require("../validators/user");

const {
    register,
    login,
    authGoogle,
    resetPasswordInit,
    resetPassword,
    get,
    logout
} = require("../controllers/user");

const {auth} = require("../middlewares/auth");

router.post("/register", registerValidator, register);
router.post("/login", loginValidator, login);
router.post("/auth/google", authGoogleValidator, authGoogle);
router.post("/reset/init", resetPasswordInitValidator, resetPasswordInit);
router.post("/reset", resetPasswordValidator, resetPassword);
router.post("/", auth, get);
router.post("/logout", auth, logout);

module.exports = router;
