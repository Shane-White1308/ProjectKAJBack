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

module.exports = {
    registerValidator
}