
import mongoose from "mongoose";


const resultSchema = new mongoose.Schema({

    studentName: String,
    studentMatNo: String,
    course: String,
    score: Number
})


const Result = mongoose.models.Result || mongoose.model("Result", resultSchema);
export default Result;
 