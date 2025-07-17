const express = require("express");
const cors = require("cors");
const routes = require("./routes")
const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true
}));

app.use(bodyParser.json()); // Đọc JSON body
// app.use(cookieParser())

app.use(express.urlencoded({ extended: true })); // Đọc dữ liệu form

routes(app);

module.exports = app;