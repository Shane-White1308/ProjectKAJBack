const User = require("../models/user");
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


const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
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
                message: "Login successful",
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
                code: 401,
                error: "Invalid email or password",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const authGoogle = async (req, res) => {
    const { googleToken } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: googleToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const { given_name, family_name, email, jti } = ticket.getPayload();

        try {
            const user = await User.findOne({ email });

            if (!user) {
                const password = await bcrypt.hash(jti, 7);
                const user = await User.create({
                    firstName: given_name,
                    lastName: family_name,
                    email,
                    password,
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
                    message: "Login successful",
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    },
                    token,
                });
            }
        } catch (error) {
            return res.json({
                status: "error",
                code: 500,
                error: "Some error occurred",
            });
        }
    } catch (error) {
        return res.json({ status: "error", code: 401, error: "Invalid token" });
    }
};

const resetPasswordInit = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const otp = generateOTP();
            const otpExpire = new Date(new Date().getTime() + 30 * 60 * 1000);

            if (await mailOtp(email, otp)) {
                await user.updateOne({otp, otpExpire})

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "OTP sent",
                });
            } else {
                return res.json({
                    status: "error",
                    code: 500,
                    error: "OTP not sent",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const resetPassword = async (req, res) => {
    const { email, otp, password: newPassword } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            if (user.otp == otp) {
                if (user.otpExpire >= new Date()) {
                    const password = await bcrypt.hash(newPassword, 7);

                    await user.updateOne({
                        password,
                        otpExpire: new Date()
                    });

                    return res.json({
                        status: "ok",
                        code: 200,
                        message: "Password changed",
                    });
                } else {
                    return res.json({
                        status: "error",
                        code: 400,
                        error: "OTP expired",
                    });
                }
            } else {
                return res.json({
                    status: "error",
                    code: 400,
                    error: "Invalid OTP",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const logout = async (req, res) => {
    res.cookie("JWT_TOKEN", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });

    return res.json({
        status: "ok",
        code: 200,
        message: "Logged out",
    });
};

const get = async (req, res) => {
    const { user } = req.body;
    try {
        if (user) {
            return res.json({
                status: "ok",
                code: 200,
                message: "Details fetched",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email
                },
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "User not found",
            });
        }
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};



module.exports = {
    register,
    login,
    authGoogle,
    resetPasswordInit,
    resetPassword,
    get,
    logout
};
