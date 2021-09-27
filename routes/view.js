const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

router.get("/view/:_id", async (req, res) => {
  // 게시글을 클릭하였을 때 조회되지 않는다면 홈 페이지로 돌린다.
  // console.log(`req.params.postId : ${req.params.postId}`);
  const _id = req.params._id;
  const isExist = await Post.findOne({ _id });
  // console.log(`isExist : ${isExist}`);
  if (isExist.length == 0) {
    console.log("ERROR IN");
    res.render("err");
    return;
  }
  // console.log(isExist[0]['user']);
  const user = isExist["user"];
  const title = isExist["title"];
  const content = isExist["content"];
  const createdAt = isExist["createdAt"];
  // const createdAt = new Date(isExist['createdAt']);
  // console.log(user, title, content, createdAt);
  // const create_date = `${createdAt.getFullYear()}-${createdAt.getMonth() + 1}-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
  // console.log(create_date);

  // res.render('view', {user, title, content, createdAt: create_date});
  res.render("view", { user, title, content, createdAt });
});

module.exports = router;
