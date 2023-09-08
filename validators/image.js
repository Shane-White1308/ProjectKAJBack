const addProductValidator = (req, res, next) => {
    const { id } = req.body;
    const filename = req.file?.filename;

    if (!id) {
        return res.json({
            status: "error",
            code: 400,
            error: "Product id is required",
        });
    }

    if (!filename) {
        return res.json({
            status: "error",
            code: 400,
            error: "Image is required",
        });
    }

    next();
};

module.exports = {
    addProductValidator,
};
