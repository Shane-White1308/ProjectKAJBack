const Feature = require("../models/feature");
const Product = require("../models/product");

const create = async (req, res) => {
    const { product: id, heading, description } = req.body;

    try {
        const product = await Product.findById(id);

        if (product) {
            const feature = await Feature.create({
                product: product._id,
                heading,
                description,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Feature added",
                feature,
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

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const features = await Feature.find({ product: id });

        return res.json({
            status: "ok",
            code: 200,
            message: "Images fetched",
            features,
        });
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
        const feature = await Feature.findById(id);

        if (feature) {
            return res.json({
                status: "ok",
                code: 200,
                message: "Feature fetched",
                feature,
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Feature not found",
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
    const { heading, description } = req.body;

    try {
        const feature = await Feature.findById(id);

        if (feature) {
            await feature.updateOne({
                heading,
                description,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Feature updated successfully",
                feature: {
                    heading,
                    description,
                },
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Feature not found",
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
        const feature = await Feature.findById(id);

        if (feature) {
            await Feature.deleteOne({ _id: feature._id });

            return res.json({
                status: "ok",
                code: 200,
                message: "Feature removed",
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Feature not found",
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
    getProduct,
    get,
    update,
    delete_,
};
