const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.get("/", (req, res) => {
    return res.json({ status: "ok", code: 200, message: "Server running" });
});
app.use("/public", express.static(path.join(__dirname, "public")));

const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const imageRoutes = require("./routes/image");

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/image", imageRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    mongoose.connect(process.env.DATABASE_URL);
});
