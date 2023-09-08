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
                ref: "product" + product.id,
                isCover: !!isCover,
                isModel: !!isModel,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Image uploaded",
                image: {
                    _id: image.id,
                    isCover: image.isCover,
                    isModel: image.isModel,
                },
            });
        } else {
            const imagePath = path.join(
                __dirname,
                "..",
                process.env.IMAGE_STORAGE_PATH,
                req.file.filename
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
            req.file.filename
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

module.exports = {
    addProduct,
};
