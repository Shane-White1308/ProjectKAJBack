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

module.exports = {
    create,
};
