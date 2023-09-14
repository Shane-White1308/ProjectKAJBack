const createValidator = (req, res, next) => {
    const { product, quantity } = req.body;

    if (!product) {
        return res.json({
            status: "error",
            code: 400,
            error: "Product id is required",
        });
    }

    if (quantity && quantity < 1) {
        return res.json({
            status: "error",
            code: 400,
            error: "Invalid quantity",
        });
    }

    next();
};

const updateValidator = (req, res, next) => {
    const { quantity } = req.body;

    if (!quantity) {
        return res.json({
            status: "error",
            code: 400,
            error: "Quantity is required",
        });
    }

    if (quantity < 1) {
        return res.json({
            status: "error",
            code: 400,
            error: "Invalid quantity",
        });
    }

    next();
};

module.exports = {
    createValidator,
    updateValidator,
};
