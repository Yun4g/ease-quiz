"use client";

export const dynamic = 'force-dynamic';

import useComponentStore from "@/app/store/ComponentIDStore";
import AuthCheck from "@/componentes/AuthCheck";
import LecturerForms from "@/componentes/LectureForms";
import ManageResults from "@/componentes/manageResults";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LecturerDashBoard() {
    const ComponentPage = useComponentStore((state)=> state.ComponentPage);
    const router = useRouter()

    useEffect(()=>{
         const token = localStorage.getItem('token')
         console.log("Token:", token);
         if (!token) {
             router.push('/login')
         }
    },[])

    return (
        <AuthCheck>
        <div className="px-3 h-full pt-4 w-full">
            {
                ComponentPage === "Form" ? (
                    <div>
                        <LecturerForms />
                    </div>
                ) : (
                    <section>
                        <ManageResults />
                    </section>
                )
            }
        </div>
        </AuthCheck>
    );
}
