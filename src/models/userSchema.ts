import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    id : {
        type : String
    },
    email : {
        type : String,
       required : true, 
        unique : true
    },
    password : {
        type : String,
        required : true, 
        
    },
    matricno : {
        type : String,
         required : true, 
       
    },
    disability : {
        type : String
    },
    role : {
        type : String,
        enum : ["student", "lecturer"],
        required : true
    }

})


const User = mongoose.models.User  ||  mongoose.model("User", userSchema);

export default User