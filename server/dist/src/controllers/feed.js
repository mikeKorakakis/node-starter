"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../lib/prisma"));
const getPosts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("here");
    const posts = yield prisma_1.default.post.findMany({ include: { author: true } });
    return res.status(200).json({ message: "posts", posts: posts });
});
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, body } = req.body;
    const user = yield prisma_1.default.user.findFirst();
    if (!user) {
        yield prisma_1.default.user.create({
            data: {
                id: 1,
                name: "test",
                email: "bob@test.com",
            },
        });
    }
    const post = yield prisma_1.default.post.create({
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
});
exports.default = { getPosts, createPost };
