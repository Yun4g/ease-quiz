"use client";

import NavBar from "@/componentes/NavBar";
import useUserRoleStore from "../store/userRoleStore";
import {  useEffect } from "react";
import Link from "next/link";


export default function LandingPage() {
        
          const Role = useUserRoleStore((state)=> state.UserRole)
          
            useEffect(() => {
                console.log("User role:", Role);
            }, [Role]);
          
       

       
         

    return (
        <div className=" w-full max-h-screen h-screen flex justify-center items-center"
          style={{
           backgroundImage: "url('/heroImage.png')",
           backgroundSize: "cover",
           backgroundPosition: "center",
           backgroundRepeat: "no-repeat",
        }}
        >
           <div className="border p-4 h-[200px] w-[300px] md:w-[400px] rounded-3xl bg-slate-100 border-green-600 shadow-xl flex flex-col justify-center items-center">
            <header className=" absolute top-1 w-full">
                <NavBar/>
            </header>
            <h1 className=" text-3xl font-bold text-green-700"> Get Started On EasyQuiz </h1>
            <div className=" flex gap-3 cursor-pointer p-4">
                <Link href="/SignUp">
              <button  className="bg-green-500 font-semibold   text-white h-14 w-32 rounded-xl nimate-pulse-scale"> Get Started </button>
                </Link>
                
            </div>
                    
              </div> 
        </div>
    )


}