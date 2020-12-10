var express = require('express');
const {createUser,
    getUserByUserId,
    getAllUsers,
    updateSpecificUser,
    deleteUsers,
    login
} = require('../Controller/userController')
const router = express.Router();
const {checkToken} = require("../auth/token_validation")
router.post("/", createUser);
router.get("/",getAllUsers);
router.get("/:id",getUserByUserId);
router.patch("/",updateSpecificUser);
router.delete("/",deleteUsers);
router.post("/login",login)

module.exports = router;

