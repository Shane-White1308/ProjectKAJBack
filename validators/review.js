const createValidator = (req, res, next) => {
    const { product, rating, heading, description } = req.body;

    if (!product) {
        return res.json({
            status: "error",
            code: 400,
            error: "Product id is required",
        });
    }

    if (!rating) {
        return res.json({
            status: "error",
            code: 400,
            error: "Rating is required",
        });
    }

    if (![1, 2, 3, 4, 5].includes(rating)) {
        return res.json({
            status: "error",
            code: 400,
            error: "Invalid rating",
        });
    }

    if (!heading || typeof heading !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Heading is required",
        });
    }

    if (!description || typeof description !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Description is required",
        });
    }

    next();
};

module.exports = {
    createValidator,
};
