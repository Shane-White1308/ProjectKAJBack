const Review = require("../models/review");
const Product = require("../models/product");

const create = async (req, res) => {
    const { user, product: id, rating, heading, description } = req.body;

    try {
        const product = await Product.findById(id);

        if (product) {
            const review = await Review.findOne({
                product: product._id,
                user: user._id,
            });

            if (!review) {
                const review = await Review.create({
                    product: product._id,
                    user: user._id,
                    rating,
                    heading,
                    description,
                });

                return res.json({
                    status: "ok",
                    code: 200,
                    message: "Review added",
                    review,
                });
            } else {
                return res.json({
                    status: "error",
                    code: 403,
                    error: "Review already exists",
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

const getProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const reviews = await Review.find({ product: id });

        return res.json({
            status: "ok",
            code: 200,
            message: "Reviews fetched",
            reviews,
        });
    } catch (error) {
        return res.json({
            status: "error",
            code: 500,
            error: "Some error occurred",
        });
    }
};

const getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const reviews = await Review.find({ user: id });

        return res.json({
            status: "ok",
            code: 200,
            message: "Reviews fetched",
            reviews,
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
        const review = await Review.findById(id);

        if (review) {
            return res.json({
                status: "ok",
                code: 200,
                message: "Review fetched",
                review,
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Review not found",
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

const summary = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);

        if (product) {
            const review = await Review.aggregate([
                { $match: { product: product._id } },
                {
                    $group: {
                        _id: { rating: "$rating" },
                        count: { $sum: 1 },
                    },
                },
            ]);

            const result = {
                totalStars: 0,
                totalReviews: 0,
            };

            review.forEach((rev) => {
                result[rev._id.rating + "starReviews"] = rev.count;
                result.totalStars += rev._id.rating * rev.count;
                result.totalReviews += rev.count;
            });

            result.avgRating = result.totalStars / result.totalReviews;

            return res.json({
                status: "ok",
                code: 200,
                message: "Summary fetched",
                summary: result,
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

const update = async (req, res) => {
    const { id } = req.params;
    const { user, rating, heading, description } = req.body;

    try {
        const review = await Review.findOne({ _id: id, user: user._id });

        if (review) {
            await review.updateOne({
                rating,
                heading,
                description,
            });

            return res.json({
                status: "ok",
                code: 200,
                message: "Review updated successfully",
                review: {
                    rating,
                    heading,
                    description,
                },
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Review not found",
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
        const review = await Review.findOne({ _id: id, user: user._id });

        if (review) {
            await Review.deleteOne({ _id: review._id, user: user._id });

            return res.json({
                status: "ok",
                code: 200,
                message: "Review removed",
            });
        } else {
            return res.json({
                status: "error",
                code: 404,
                error: "Review not found",
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
    getUser,
    get,
    summary,
    update,
    delete_,
};
