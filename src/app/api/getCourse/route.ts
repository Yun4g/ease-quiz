import connectDB from "@/lib/mongoose";
import {NextResponse } from "next/server";







export async function GET() {

    try {
        await connectDB();
        const CourseModel = (await import("../../../models/questionSchema")).default;
        const courses = await CourseModel.find();

        return  NextResponse.json( courses, { status: 200, headers: { "Content-Type": "application/json" } });

        
    } catch (error) {
        console.error("Error fetching course:", error);
        return  NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }

}