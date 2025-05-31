"use client";

export const dynamic = 'force-dynamic';

import useComponentStore from "@/app/store/ComponentIDStore";
import LecturerForms from "@/componentes/LectureForms";
import ManageResults from "@/componentes/manageResults";

export default function LecturerDashBoard() {
    const ComponentPage = useComponentStore((state)=> state.ComponentPage);

    return (
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
    );
}
