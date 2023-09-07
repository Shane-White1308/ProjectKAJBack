const Category = require("../models/category");

const create = async (req, res) => {
    const { name } = req.body;
    name = name.toLowerCase();

    try {
        const category = await Category.findOne({ name });

        if (!category) {
            const category = await Category.create({ name });

            return res.json({
                status: "ok",
                code: 200,
                message: "Category added",
                category: {
                    _id: category._id,
                    name: category.name,
                },
            });
        } else {
            return res.json({
                status: "error",
                code: 409,
                error: "Category already exists",
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
        const categories = await Category.find();

        return res.json({
            status: "ok",
            code: 200,
            message: "Categories fetched",
            categories,
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
    const { id, name } = req.body;
    name = name.toLowerCase();

    try {
        const category = await Category.findById(id);

        if (category) {
            await category.updateOne({
                name,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Category updated",
                category: {
                    name,
                },
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

const delete_ = async (req, res) => {
    const { id } = req.body;

    try {
        const category = await Category.findById(id);

        if (category) {
            await category.remove();

            return res.json({
                status: "ok",
                code: 200,
                message: "Category removed",
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

module.exports = {
    create,
    getAll,
    update,
    delete_,
};
