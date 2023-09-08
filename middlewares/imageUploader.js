const multer = require("multer");
const path = require("path");
var fs = require("fs");
const crypto = require("crypto");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        const dirpath = path.join(
            __dirname,
            "..",
            process.env.IMAGE_STORAGE_PATH
        );

        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath, { recursive: true });
        }

        callback(
            null,
            path.join(__dirname, "..", process.env.IMAGE_STORAGE_PATH)
        );
    },
    filename: function (req, file, callback) {
        const id = crypto.randomBytes(5).toString("hex");
        callback(null, `${Date.now()}_${id}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        const extension = path.extname(file.originalname);
        if (
            extension !== ".png" &&
            extension !== ".jpg" &&
            extension !== ".gif" &&
            extension !== ".jpeg"
        ) {
            return callback(new Error("Only images are allowed"));
        }
        callback(null, true);
    },
});

const imageUploader = (req, res, next) => {
    return upload.single("file")(req, res, (error) => {
        if (error) {
            return res.json({
                status: "error",
                code: 500,
                error: "Error uploading image",
            });
        } else {
            next();
        }
    });
};

module.exports = imageUploader;
