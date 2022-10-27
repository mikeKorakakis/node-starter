import express from "express";
import bodyParser from "body-parser";
import feedRoutes from "./routes/feed";


if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use((req, res, next) => {
	console.log("Request URL:", req.url);
	console.log("Request URL:", req.body);
	next();
});

app.use('/feed', feedRoutes);

app.use("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
})

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
