const express = require("express");
const app = express();
const port = 3000;

//최 상단에서 request로 수신되는 Post 데이터가 정상적으로 수신되도록 설정한다.
//주소 형식으로 데이터를 보내는 방식
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// html을 대체하는 ejs 엔진을 설정
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

//몽고 DB 및 Schema 설정
// 몽고 DB의 스키마 설정시 index.js의 이름을 변경해선 안된다.
const connect = require("./schemas");
connect();
console.log(connect);

// 통신을 수행하는 Router 생성
const routerRouter = require("./routers/router");
app.use("/api", [routerRouter]);

const viewRouter = require("./routes/view");
const writeRouter = require("./routes/write");
const modifyRouter = require("./routes/modify");
app.use("/", [viewRouter, writeRouter, modifyRouter]);

app.get("/", (request, response) => {
  // let name = request.query.name
  response.render("index");
  // console.log(`name : ${name}`);
});

app.get("/goods", (request, response) => {
  let name = request.query.name;
  // console.log(name);
  response.render("index");
  // console.log(`name : ${name}`);
});
app.get("/err", (req, res) => {
  console.log("insert error");
  res.render("err");
});

app.get("/write", (req, res) => {
  res.render("write");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
