const Product = require("../models/product");
const Category = require("../models/category");
const Image = require("../models/image");
var fs = require("fs");
const path = require("path");

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
                product: {
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    offer: product.offer,
                    size: product.size,
                    summary: product.summary,
                    description: product.description,
                    category: product.category,
                },
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

const createImage = async (req, res) => {
    const { id, isCover, isModel } = req.body;

    try {
        const product = await Product.findById(id);

        if (product) {
            const image = await Image.create({
                filename: req.file.filename,
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
                fs.unlink(imagePath);
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
            fs.unlink(imagePath);
        }

        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

module.exports = {
    create,
    createImage,
};
