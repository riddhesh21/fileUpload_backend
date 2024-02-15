const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
require('dotenv').config()
const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }

})

fileSchema.post('save',async(doc)=>{
    try{
      let transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    let info = await transporter.sendMail({
        from: `himanshurelhan70@gmail.com`,
        to: doc.email,
        subject: "New File Uploaded on Cloudinary",
        html: `<h2>Hello ${doc.name} </h2> 
        <p>File has been successfully Uploaded </p>
        <p>View here: <a href="${doc.url}">${doc.url}</a></p>
        `,
    });

    console.log("INFO of mail", info);


    }catch(err){
        console.error(err);

    }

})

module.exports = mongoose.model('fileData',fileSchema)