
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return  NextResponse.json({ message: "Email and password are required" }, { status: 400 });
    }
   await connectDB();

  
    const user = await User.findOne({ email });
    if (!user) {
      return  NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return  NextResponse.json({ message: "Invalid password" }, { status: 401 });
    }

     const tokenData = {
      id: user._id,
      email: user.email,
      role : user.role
    };
   
     const token =  jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

     const res =   NextResponse.json({ message: "Login successful", userId: user._id, role : user.role , token }, { status: 200 });

    return res;

  } catch (error) {
    console.error("Error during login:", error);
    return  NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
