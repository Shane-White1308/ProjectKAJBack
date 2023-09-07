const express = require("express");
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.get("/", (req, res) => {
    return res.json({ message: "Server running", code: 200 });
});

const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

app.use("/user", userRoutes);
app.use("/category", categoryRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    mongoose.connect(process.env.DATABASE_URL);
});
