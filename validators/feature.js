const createValidator = (req, res, next) => {
    const { product, heading, description } = req.body;

    if (!product) {
        return res.json({
            status: "error",
            code: 400,
            error: "Product id is required",
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
