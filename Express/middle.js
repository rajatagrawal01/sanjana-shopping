import express from 'express';
const app=express();

const middle=(req,res,next)=>{
        console.log(`Welcome Sanjana, Middleware executed. Path from url: ${req.path}`);
        next();
}
app.use(middle); //runs everytime when something happens -Application level
app.get('/',(req,res)=>{
    res.send("Hello Class");
})
app.listen(5000,()=>{
    console.log("Connection established at port 5000");
    
})