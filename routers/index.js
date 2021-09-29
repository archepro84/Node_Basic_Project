const express = require("express");
const Posts = require("./router_Posts");

const router = express.Router();

router.use('/posts/', Posts);

module.exports = router;
