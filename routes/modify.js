const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/modify/:_id", async (req, res) => {
  // 게시글을 클릭하였을 때 조회되지 않는다면 홈 페이지로 돌린다.
  const _id = req.params._id;
  const isExist = await Post.findOne({ _id });
  if (isExist.length == 0) {
    console.log("ERROR IN");
    res.render("err");
    return;
  }

  const user = isExist["user"];
  const title = isExist["title"];
  const content = isExist["content"];
  // console.log(user, title, content);

  res.render("modify", { user, title, content });
});

module.exports = router;
