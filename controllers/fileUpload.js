const file = require('../models/files')
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose')
const fileDatas = require('../models/files')
exports.localUpload = async(req,res)=>{
     try{
    const File = req.files.file
    console.log(`${File.name}`)
    let path  = __dirname + "/files/"+ Date.now()+ `.${File.name.split('.')[2]}`
    File.mv(path,(err)=>{
        console.log(`${err}`)
    })
    res.json({
        success: true,
        message: "Local File Uploaded Successfully",
    });
     
}catch(err){
       console.log("Not able to upload the file on server");
       console.log(err);
    }
    
}

const uploadToCloudinary = async(file,folder)=>{
    const options = {
        folder:folder,
      
    }
    options.resource_type= "auto"
    return  await cloudinary.uploader.upload(file.tempFilePath,options)
}

function isValidFormat (fileExt,supportedFormat){
      return supportedFormat.includes(fileExt)
}

exports.imageUpload = async (req,res)=>{
    try{
       const supportedFormat = ['jpeg','png','jpg']
       const {name,email,tags} =req.body
    //    console.log(req.file.image)
       const cFile = req.files.image
    
       console.log(cFile)
       const fileExt = `${cFile.name.split('.')[1]}`.toLowerCase()
       if(!isValidFormat(fileExt,supportedFormat)){
        res.status(200).json({
            message:"file format is supported"
        })
       }
       const response = await uploadToCloudinary(cFile,"cloudinaryUpload")

       const fileData = await fileDatas.create({
        name,
        tags,
        email,
        url: response.secure_url,
    });

    res.json({
        success: true,
        imageUrl: response.secure_url,
        message: "Image Successfully Uploaded",
    });
       
    }catch(err){
        res.status(400).json({
            success: false,
            message: "Something went wrong",
        });
        console.log(err)
        // console.log(req.file.image)
    }
}
function isLarge(fileSize){
    fileSize = fileSize/(1024*1024)
    return fileSize > 5;
}



exports.videoUpload = async(req,res)=>{
    try{
    const {name,tags,email}=req.body;
    const videoFile = req.files.videoFile;
    const fileExt = `${videoFile.name.split('.')[1]}`.toLowerCase()
    const supportedFormat = ['mp4','mov']

    if(!isValidFormat(fileExt,supportedFormat)){
        res.status(200).json({
            message:"file format is supported"
        })
     }
     const fileSize = videoFile.size
    //  if(isLarge(fileSize)){
    //     return res.status(400).json({
    //         success: false,
    //         message: "File format not supported",
    //     });
    //  }
     
     const response = await uploadToCloudinary(videoFile,"cloudinaryUpload")
    
     const fileData = await fileDatas.create({
        name,
        tags,
        email,
        url: response.secure_url,
    });

    res.json({
        success: true,
        imageUrl: response.secure_url,
        message: "Image Successfully Uploaded",
    });
}catch(err){
    res.status(400).json({
        success: false,
        message: "Something went wrong"+ err,
    });
    console.log(err)
}
}