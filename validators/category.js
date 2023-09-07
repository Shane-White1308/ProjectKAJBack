const createValidator = (req, res, next) => {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Name is required",
        });
    }

    next();
};

const updateValidator = (req, res, next) => {
    const { id, name } = req.body;

    if (!id) {
        return res.json({
            status: "error",
            code: 400,
            error: "Category id is required",
        });
    }

    if (!name || typeof name !== "string") {
        return res.json({
            status: "error",
            code: 400,
            error: "Name is required",
        });
    }

    next();
};

const deleteValidator = (req, res, next) => {
    const { id } = req.body;

    if (!id) {
        return res.json({
            status: "error",
            code: 400,
            error: "Category id is required",
        });
    }

    next();
};

module.exports = {
    createValidator,
    updateValidator,
    deleteValidator,
};
