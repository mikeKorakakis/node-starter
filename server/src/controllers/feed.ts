import { Request, Response, NextFunction } from "express";
import prisma from "../lib/prisma";

const getPosts = async (req: Request, res: Response, next: NextFunction) => {
	console.log("here");
	const posts = await prisma.post.findMany({ include: { author: true } });
	return res.status(200).json({ message: "posts", posts: posts });
};

const createPost = async (req: Request, res: Response, next: NextFunction) => {
	const { title, body } = req.body;

	const user = await prisma.user.findFirst();
	if (!user) {
		await prisma.user.create({
			data: {
				id: 1,
				name: "test",
				email: "bob@test.com",
			},
		});
	}
	const post = await prisma.post.create({
		data: {
			title,
			body,
			author: { connect: { id: 1 } },
		},
	});
	// const post: Post = {
	// 	id: Math.random(),
	// 	title: req.body.title,
	// 	body: req.body.body,
	// };
	res.status(201).json({ message: "post created", post: post });
};

export default { getPosts, createPost };
