const express=require('express')
const router=express.Router()
router.get("/",(req,res)=>{
    res.send("Weather data")
})

module.exports=router;