const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("Ask GPT")
})

module.exports=router;