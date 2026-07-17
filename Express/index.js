import express from 'express';

// const express=require('express') // commonJS method

const app=express();

app.get('/',(req,res)=>{
    res.send("Hello Class");
})

app.listen(5000,()=>{
    console.log("Connection established at port 5000");
})