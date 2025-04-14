const express = require("express");
const {getUserInfo} = require("../controllers/userInfo");
const {userAuth} = require("../middlewere/userAuth");

const router = express.Router();
router.get('/user-info',userAuth ,getUserInfo)


module.exports = router;