const Cart = require("../models/cart");
const Product = require("../models/product");

const create = async (req, res) => {
    const { user, product: id } = req.body;
    const quantity = req.body.quantity || 1;

    try {
        const product = await Product.findById(id);

        if (product) {
            const cart = await Cart.findOne({
                product: product._id,
                user: user._id,
            });

            if (!cart) {
                const cart = await Cart.create({
                    product: product._id,
                    user: user._id,
                    quantity,
                });

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Product added to cart",
                    cart,
                });
            } else {
                return res.json({
                    status: "error",
                    code: 403,
                    error: "Product already in cart",
                });
            }
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Product not found",
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

const get = async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    try {
        const cart = await Cart.findOne({ user: user._id, _id: id });

        if (cart) {
            return res.json({
                status: "ok",
                code: 200,
                message: "Cart fetched",
                cart,
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Cart item not found",
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

const getUser = async (req, res) => {
    const { user } = req.body;

    try {
        const carts = await Cart.find({ user: user._id });

        return res.json({
            status: "ok",
            code: 200,
            message: "Cart items fetched",
            carts,
        });
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const update = async (req, res) => {
    const { id } = req.params;
    const { user, quantity } = req.body;

    try {
        const cart = await Cart.findOne({ _id: id, user: user._id });

        if (cart) {
            await cart.updateOne({
                quantity,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Cart updated successfully",
                cart: {
                    quantity,
                },
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Cart item not found",
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

const delete_ = async (req, res) => {
    const { id } = req.params;
    const { user } = req.body;

    try {
        const cart = await Cart.findOne({ _id: id, user: user._id });

        if (cart) {
            await Cart.deleteOne({ _id: cart._id, user: user._id });

            return res.json({
                status: "ok",
                code: 200,
                message: "Cart item removed",
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Cart item not found",
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
    create,
    get,
    getUser,
    update,
    delete_,
};
