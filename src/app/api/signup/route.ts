import connectDB from "@/lib/mongoose";
import User from "@/models/userSchema";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
     
    try {
    await  connectDB();
     const { email, password, matricno, disability, role } = await req.json();

       const ExistingUser = await User.findOne({email});
       if (ExistingUser) {
           return new NextResponse(JSON.stringify({ message: "User already exists " }), { status: 400 });
       }

       const hashedPassword = await bcrypt.hash(password, 10);

         const newUser = new User({
              email,
              password : hashedPassword,
              matricno,
              disability,
              role
         });

          await newUser.save();
          return new NextResponse(JSON.stringify({ message: "User created successfully" }), { status: 201 });
    

    } catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }

}