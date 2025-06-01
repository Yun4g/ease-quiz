import { NextRequest } from "next/server";





export async function POST(request: NextRequest) {
    try {
        const { studentName, studentMatNo, course, score } = await request.json()

        const resultModel = (await import("@/models/resultSchema")).default;

        const newResult = new resultModel({
            studentName,
            studentMatNo,
            course,
            score
        });
        await newResult.save();

        return new Response(JSON.stringify({ message: "Result saved successfully" }), { status: 201, headers: { "Content-Type": "application/json" } })
    } catch (error) {
        console.error("Error processing result:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });

    }
} 