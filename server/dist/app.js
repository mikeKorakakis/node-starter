"use strict";
const express = require("express");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const app = express();
const port = process.env.PORT;
app.use((req, res, next) => {
    console.log("Request URL:", req.originalUrl);
    next();
});
app.use("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
