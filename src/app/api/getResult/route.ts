import connectDB from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const ResultModel = (await import("@/models/resultSchema")).default;
    const results = await ResultModel.find();

    return NextResponse.json(results, {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching results:", error);
    return NextResponse.json({ message: "Internal Server Error" }, {
      status: 500,
    });
  }
}
