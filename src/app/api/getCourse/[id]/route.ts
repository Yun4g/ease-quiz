import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;

  try {
    await connectDB();
    const CourseModel = (await import("@/models/questionSchema")).default;
    const course = await CourseModel.findById(id);

    if (!course) {
      return NextResponse.json({ message: "Course not found" }, { status: 404 });
    }

    return NextResponse.json(course, { status: 200 });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}