
const express = require('express');
const {userSignup,signin,check,getuser,removeResume,logout,storeResume,generateResume,getResume,} = require('../controllers/userController');
const verifyToken = require('../middleware/veifyToken');


const router=express.Router()


router.post("/signup",userSignup)
router.post("/signin",signin)
router.get("/check",verifyToken,check)
router.post("/resume",verifyToken,storeResume)
router.get("/resume",verifyToken,getResume)
router.post("/airesume",verifyToken,generateResume)
router.post("/logout",verifyToken,logout)
router.delete("/resume/:id",verifyToken,removeResume)
router.get("/details/:id",verifyToken,getuser)

module.exports=router