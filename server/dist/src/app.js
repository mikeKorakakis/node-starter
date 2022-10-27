"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const feed_1 = __importDefault(require("src/routes/feed"));
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    console.log("Request URL:", req.url);
    console.log("Request URL:", req.body);
    next();
});
app.use('/feed', feed_1.default);
app.use("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
