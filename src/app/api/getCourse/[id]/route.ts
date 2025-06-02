import connectDB from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
) {
  const { id } = params;

  try {
    await connectDB();
    const CourseModel = (await import("@/models/questionSchema")).default;
    const course = await CourseModel.findById(id);

    if (!course) {
      return new NextResponse(JSON.stringify({ message: "Course not found" }), {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(course), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
