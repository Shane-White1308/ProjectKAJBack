const Product = require("../models/product");
const Category = require("../models/category");

const create = async (req, res) => {
    const { name, price, offer, size, summary, description, category } =
        req.body;

    try {
        if (category && !(await Category.findById(category))) {
            return res.json({
                status: "error",
                code: 404,
                error: "Category not found",
            });
        } else {
            const product = await Product.create({
                name,
                price,
                offer,
                size,
                summary,
                description,
                category,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Product added",
                product,
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

    try {
        const product = await Product.findById(id);

        if (product) {
            return res.json({
                status: "ok",
                code: 200,
                message: "Product fetched",
                product,
            });
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

const getAll = async (req, res) => {
    try {
        const products = await Product.find();

        return res.json({
            status: "ok",
            code: 200,
            message: "Products fetched",
            products,
        });
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const search = async (req, res) => {
    const { query } = req.query;

    try {
        const products = await Product.find({
            name: { $regex: query, $options: "i" },
        });

        return res.json({
            status: "ok",
            code: 200,
            message: "Products fetched",
            products,
        });
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const getByCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (category) {
            const products = await Product.find({
                category: category.id,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Products fetched",
                products,
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Category not found",
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

const update = async (req, res) => {
    const { id } = req.params;
    const { name, price, offer, size, summary, description, category } =
        req.body;

    try {
        const product = await Product.findById(id);

        if (product) {
            if (category && !(await Category.findById(category))) {
                return res.json({
                    status: "error",
                    code: 404,
                    error: "Category not found",
                });
            } else {
                await product.updateOne({
                    name,
                    price,
                    offer,
                    size,
                    summary,
                    description,
                    category,
                });

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Product updates successfully",
                    product: {
                        name,
                        price,
                        offer,
                        size,
                        summary,
                        description,
                        category,
                    },
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

const delete_ = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (product) {
            await Product.deleteOne({ _id: product._id });

            return res.json({
                status: "ok",
                code: 200,
                message: "Product removed",
            });
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

module.exports = {
    create,
    get,
    getAll,
    search,
    getByCategory,
    update,
    delete_,
};
