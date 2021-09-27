const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

// 게시글 데이터를 입력 받는 함수
router.post("/post", async (req, res) => {
    try {
        const {user, password, title, content, comment, createdAt} = req.body;

        await Post.create({user, password, title, content, comment, createdAt});
        res.send({result: "success"});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

// 모든 게시글 데이터를 반환하는 함수
router.get("/posts", async (req, res) => {
    try {
        let jsonData = await Post.find().sort({createdAt: -1});
        for (let x in jsonData) {
            const createdAt = new Date(jsonData[x]["createdAt"]);
            const create_date = `${createdAt.getFullYear()}-${
                createdAt.getMonth() + 1
            }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
            jsonData[x]["createdAt"] = create_date;
        }
        res.send({result: jsonData});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

//개시글 생성
router.post("/write", async (req, res) => {
    try {
        const {title, user, password, content} = req.body;

        await Post.create({user, password, title, content});
        res.send({result: "Success"});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

//게시글 수정
router.put("/modify/:_id", async (req, res) => {
    try {
        const _id = req.params._id;

        const user = req.body["user"];
        const password = req.body["password"];
        const title = req.body["title"];
        const content = req.body["content"];

        const isExist = await Post.findOne({_id, password});
        if (!isExist || !_id || !user || !password || !title || !content) {
            console.log(`${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`);

            res.send({result: 406});
            return;
        }
        await Post.updateOne({_id}, {$set: {user, title, content}});
        res.send({result: "Success"});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

// 게시글 삭제
router.delete("/delete/:_id", async (req, res) => {
    try {
        const _id = req.params._id;

        const password = req.body["password"];
        const isExist = await Post.findOne({_id, password});

        if (!isExist || !_id) {
            console.log(`${req.method} ${req.originalUrl} : 일치하지 않는 비밀번호 입니다.`);

            res.send({result: 406});
            return;
        }

        await Post.deleteOne({_id});
        res.send({result: "Success"});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

module.exports = router;
