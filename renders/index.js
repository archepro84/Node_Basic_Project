const express = require("express");
const viewRouter = require("./view");
const modifyRouter = require("./modify");
const mainRouter = require('./main');
const writeRouter = require('./write');

const router = express.Router();

router.use("/", mainRouter);
router.use("/view", viewRouter);
router.use("/write", writeRouter);
router.use("/modify", modifyRouter);

module.exports = router;