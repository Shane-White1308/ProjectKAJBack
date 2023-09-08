const Category = require("../models/category");

const create = async (req, res) => {
    let { name } = req.body;
    name = name.toLowerCase();

    try {
        const category = await Category.findOne({ name });

        if (!category) {
            const category = await Category.create({ name });

            return res.json({
                status: "ok",
                code: 200,
                message: "Category added",
                category,
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

const get = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (category) {
            return res.json({
                status: "ok",
                code: 200,
                message: "Category fetched",
                category,
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
    let { id, name } = req.body;
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
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        if (category) {
            await Category.deleteOne({ _id: id });

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
    get,
    getAll,
    update,
    delete_,
};
