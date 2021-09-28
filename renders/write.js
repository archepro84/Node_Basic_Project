const express = require("express");
const router = express.Router();

// 게시글 작성 페이지
router.get("/", (req, res) => {
    try {

        res.render("write");
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : 페이지를 불러올 수 없습니다.`);
        res.render("err");
        return;
    }
});

module.exports = router;
