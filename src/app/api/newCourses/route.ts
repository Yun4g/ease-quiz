import connectDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";





export async function POST(req : NextRequest) {

    try {
        await connectDB()
        const { courseTitle, coursesLevel, questionData} = await req.json()
        if (!courseTitle || !coursesLevel || !questionData || questionData.length === 0) {
            return new NextResponse(JSON.stringify({message : "All fields are required"}), {status : 400})
        }

        const CourseModel = (await import("@/models/questionSchema")).default;
        const newCourse = new CourseModel({
            courseTitle,
            coursesLevel,
            questionData
        });
        await newCourse.save();

        return new NextResponse(JSON.stringify({message : "Course created successfully"}), {status : 201})


        
    } catch (error) {
        return new NextResponse(JSON.stringify({message : "server error"}), {status : 500})
        console.log(error)
        
    }
    
}