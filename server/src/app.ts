import express from "express";
import bodyParser from "body-parser";
import feedRoutes from "src/routes/feed";
import authRoutes from "src/routes/auth";
import { Request, Response, NextFunction } from "express";
import { ResponseError } from "src/types/responseError";

if (process.env.NODE_ENV !== "production") {
	require("dotenv").config();
}

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use((req, res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use((req, res, next) => {
	console.log("Request URL:", req.url);
	console.log("Request URL:", req.query);
	console.log("Request URL:", req.body);
	next();
});

app.use("/feed", feedRoutes);

app.use("/auth", authRoutes);

app.use("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

app.use(
	(error: ResponseError, req: Request, res: Response, next: NextFunction) => {
		console.log(error);
		const status = error.statusCode || 500;
		const message = error.message;
		const data = error.data;
		res.status(status).json({ message: message, data: data });
	}
);

app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`);
});
