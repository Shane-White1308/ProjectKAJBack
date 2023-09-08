const createValidator = (req, res, next) => {
    const { name, price, size, summary, description } = req.body;

    if (!name || typeof name !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Name is required",
        });
    }

    if (!price) {
        return res.json({
            status: "error",
            code: 400,
            error: "Price is required",
        });
    }

    if (!size || typeof size !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Size is required",
        });
    }

    if (!summary || typeof summary !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Summary is required",
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
