const Product = require("../models/product");
const Image = require("../models/image");
var fs = require("fs");
const path = require("path");

const addProduct = async (req, res) => {
    const { id, isCover, isModel } = req.body;
    const { filename } = req.file;

    try {
        const product = await Product.findById(id);

        if (product) {
            const image = await Image.create({
                filename,
                ref: "product" + product._id,
                isCover: !!isCover,
                isModel: !!isModel,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Image uploaded",
                image: {
                    _id: image._id,
                    isCover: image.isCover,
                    isModel: image.isModel,
                },
            });
        } else {
            const imagePath = path.join(
                __dirname,
                "..",
                process.env.IMAGE_STORAGE_PATH,
                filename
            );

            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, () => {});
            }

            return res.json({
                status: "error",
                code: 404,
                error: "Product not found",
            });
        }
    } catch (error) {
        const imagePath = path.join(
            __dirname,
            "..",
            process.env.IMAGE_STORAGE_PATH,
            filename
        );

        if (fs.existsSync(imagePath)) {
            fs.unlink(imagePath, () => {});
        }

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
        let images = await Image.find({ ref: "product" + id });

        const fileDirUrl = req.protocol + "://" + req.get("host");

        images = images.map((image) => {
            return {
                ...image._doc,
                url:
                    fileDirUrl +
                    process.env.IMAGE_STORAGE_PATH +
                    "/" +
                    image.filename,
            };
        });

        return res.json({
            status: "ok",
            code: 200,
            message: "Images fetched",
            images,
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
        const image = await Image.findById(id);
        const fileDirUrl = req.protocol + "://" + req.get("host");

        if (image) {
            return res.json({
                status: "ok",
                code: 200,
                message: "Image fetched",
                image: {
                    ...image._doc,
                    url:
                        fileDirUrl +
                        process.env.IMAGE_STORAGE_PATH +
                        "/" +
                        image.filename,
                },
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Image not found",
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
        const image = await Image.findById(id);

        if (image) {
            const imagePath = path.join(
                __dirname,
                "..",
                process.env.IMAGE_STORAGE_PATH,
                image.filename
            );

            if (fs.existsSync(imagePath)) {
                fs.unlink(imagePath, () => {});
            }

            await Image.deleteOne({ _id: image._id });

            return res.json({
                status: "ok",
                code: 200,
                message: "Image removed",
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Image not found",
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
    addProduct,
    getProduct,
    get,
    delete_,
};
