const express = require('express')
const app = express();
require('dotenv').config()
app.use(express.json())
const routes = require('./routes/fileRoutes')
const PORT= process.env.PORT || 3000
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

app.get('/',(req,res)=>{
    console.log("get req is successful")
    res.json({
        message:"welcome to upload files"
    })
})
app.use('/api/v1/',routes)


const {cloudinaryConnect} = require('./config/cloudinaryConnect')
cloudinaryConnect()
const dbConnect = require('./config/dbConnect')
dbConnect()
app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})

