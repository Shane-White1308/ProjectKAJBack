const { verify } = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
    const token = req.cookies.JWT_TOKEN || req.body.JWT_TOKEN;

    if (token) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);

            if (user) {
                req.body.user = user;
                next();
            } else {
                return res.json({
                    status: "error",
                    code: 401,
                    error: "Invalid token",
                });
            }
        } catch (error) {
            return res.json({
                status: "error",
                code: 401,
                error: "Invalid token",
            });
        }
    } else {
        return res.json({
            status: "error",
            code: 401,
            error: "Not authorized",
        });
    }
};


module.exports = {
    auth
};
