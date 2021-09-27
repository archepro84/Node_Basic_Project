const express = require("express");
const Post = require("../schemas/post");
const router = express.Router();

// 게시글 데이터를 입력 받는 함수
router.post("/post", async (req, res) => {
  // console.log(req.body);
  const { user, password, title, content, comment, createdAt } = req.body;

  // isExist = await Post.find({postId});
  // if (isExist.length == 0) {
  await Post.create({ user, password, title, content, comment, createdAt });
  // }
  // console.log(isExist.length);
  res.send({ result: "success" });
});

// 모든 게시글 데이터를 반환하는 함수
router.get("/posts", async (req, res) => {
  // console.log(req.body);
  json_data = await Post.find().sort({ createdAt: -1 });
  // console.log(`json_data : ${json_data}`);
  for (let x in json_data) {
    const createdAt = new Date(json_data[x]["createdAt"]);
    const create_date = `${createdAt.getFullYear()}-${
      createdAt.getMonth() + 1
    }-${createdAt.getDate()} ${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;
    json_data[x]["createdAt"] = create_date;
    console.log(create_date);
  }
  console.log(json_data);
  res.send({ result: json_data });
});

router.post("/write", async (req, res) => {
  // console.log("Hello ");
  // console.log(req.body);
  const { title, user, password, content } = req.body;
  console.log(title, user, password, content);

  json_data = await Post.create({ user, password, title, content });
  res.send({ result: "Success" });
});

router.patch("/modify/:_id", async (req, res) => {
  const _id = req.params._id;
  const user = req.body["user"];
  const password = req.body["password"];
  const title = req.body["title"];
  const content = req.body["content"];

  const isExist = await Post.findOne({ _id, password });
  if (!isExist || !_id || !user || !password || !title || !content) {
    console.log("modify/_id : 일치하지 않는 비밀번호 입니다.");
    res.send({ result: 406 });
    return;
  }
  await Post.updateOne({ _id }, { $set: { user, title, content } });
  res.send({ result: "Success" });
});

router.delete("/delete/:_id", async (req, res) => {
  //undefined 시 발생하는 모든 삭제 오류 제거
  const _id = req.params._id;
  const password = req.body["password"];
  const isExist = await Post.findOne({ _id, password });
  if (!isExist || !_id) {
    console.log("delete/_id : 일치하지 않는 비밀번호 입니다.");
    res.send({ result: 406 });
    return;
  }
  // console.log(_id);
  // console.log(isExist);

  await Post.deleteOne({ _id });
  res.send({ result: "Success" });
});

module.exports = router;
