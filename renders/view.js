const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

// 게시글 조회 페이지
router.get("/:_id", async (req, res) => {
    try {
        const _id = req.params._id;

        const isExist = await Post.findOne({_id});
        const result = {
            user: isExist["user"],
            title: isExist["title"],
            content: isExist["content"],
            createdAt: isExist["createdAt"],
        };

        res.render("view", result);
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : 데이터가 존재하지 않습니다.`);
        res.render("err");
        return;
    }
});

module.exports = router;
