const mongoose = require('mongoose')

const dbConnect = ()=>{mongoose.connect(process.env.DATABASE_URL,{
    useNewurlParser : true,
    useUnifiedTopology:true,
}).then(()=>{
     console.log("database connected successfully")
}).catch((err)=>{
    console.log(`${err} has occured`)
})
}
module.exports = dbConnect