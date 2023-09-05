const registerValidator = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || typeof firstName !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "First name is required",
        });
    }
    if (!lastName || typeof lastName !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Last name is required",
        });
    }
    if (!email || typeof email !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Email is required",
        });
    }
    if (!password) {
        return res.json({
            status: "error",
            code: 400,
            error: "Password is required",
        });
    }
    if (password.length < 8 || password.length > 20) {
        return res.json({
            status: "error",
            code: 400,
            error: "Password length must be of 8-20 characters",
        });
    }

    next();
};

const loginValidator = (req, res, next) => {
    const { email, password } = req.body;

    if (!email || typeof email !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Email is required",
        });
    }
    if (!password) {
        return res.json({
            status: "error",
            code: 400,
            error: "Password is required",
        });
    }

    next();
};

const authGoogleValidator = (req, res, next) => {
    const { googleToken } = req.body;

    if (!googleToken) {
        return res.json({
            status: "error",
            code: 401,
            error: "Token not found",
        });
    }

    next();
};

const resetPasswordInitValidator = (req, res, next) => {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Email is required",
        });
    }

    next();
};

const resetPasswordValidator = (req, res, next) => {
    const { email, otp, password: newPassword } = req.body;

    if (!email || typeof email !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Email is required",
        });
    }
    if (!otp) {
        return res.json({
            status: "error",
            code: 400,
            error: "OTP is required",
        });
    }
    if (!newPassword) {
        return res.json({
            status: "error",
            code: 400,
            error: "New password is required",
        });
    }
    if (newPassword.length < 8 || newPassword.length > 20) {
        return res.json({
            status: "error",
            code: 400,
            error: "Password length must be of 8-20 characters",
        });
    }

    next();
};


module.exports = {
    registerValidator,
    loginValidator,
    authGoogleValidator,
    resetPasswordInitValidator,
    resetPasswordValidator
}