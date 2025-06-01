
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongoose";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new NextResponse(JSON.stringify({ message: "Email and password are required" }), { status: 400 });
    }
   await connectDB();

  
    const user = await User.findOne({ email });
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ message: "Invalid password" }), { status: 401 });
    }

     const tokenData = {
      id: user._id,
      email: user.email,
      role : user.role
    };
   
     const token =  jwt.sign(tokenData, process.env.JWT_SECRET!, { expiresIn: "1d" });

     const res =  new NextResponse(JSON.stringify({ message: "Login successful", userId: user._id, role : user.role  }), { status: 200 });
  
    res.cookies.set("token", token, {
      httpOnly: true,
    });

    return res;

  } catch (error) {
    console.error("Error during login:", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
