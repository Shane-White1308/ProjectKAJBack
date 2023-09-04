const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const generateOTP = require("../utils/generateOTP");
const mailOtp = require("../utils/mailOTP");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const register = async (req, res) => {
    const {firstName, lastName, email, password: plainPassword} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user) {
            const password = await bcrypt.hash(plainPassword, 7);

            const user = await User.create({
                firstName,
                lastName,
                email,
                password
            });

            const token = generateToken(user._id);

            res.cookie("JWT_TOKEN", token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Account created",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
                token,
            });
        } else {
            return res.json({
                status: "error",
                code: 409,
                error: "Email already exists",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
}
module.exports = {
    register
};
