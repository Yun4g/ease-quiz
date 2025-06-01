import connectDB from "@/lib/mongoose";
import {  NextResponse } from "next/server";




export async function GET() {
    try {
     await connectDB();
     const ResultModel = (await import("@/models/resultSchema")).default;
     const results = await ResultModel.find();
     return new NextResponse(JSON.stringify(results), { status: 200, headers: { "Content-Type": "application/json" } });

        
    } catch (error) {
       return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 }); 
       console.log(error) 
    } 
       
}