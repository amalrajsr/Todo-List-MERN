const mongoose=require('mongoose')

const userSchema= mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    
})

module.exports= mongoose.model("user",userSchema)
