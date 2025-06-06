"use client";
import useComponentStore from "@/app/store/ComponentIDStore";
import Link from "next/link";

function LectureNavBar() {
  const DisplayForm = useComponentStore((state) => state.DisplayForm);
  const DisplayManageQuestion = useComponentStore((state) => state.DisplayManageQuestion);
  const ComponentPage = useComponentStore((state) => state.ComponentPage);

  const handleDisplayForm = () => {
    DisplayForm();
  };

  const handleDisplayManageQuestion = () => {
    DisplayManageQuestion();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/Login"; // Redirect to login page
  }

  return (
    <nav className="bg-gray-800 border-2 border-green-500 rounded-2xl p-3 sm:p-4 w-full max-w-xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8 text-center">
        <p
          onClick={handleDisplayForm}
          className={`cursor-pointer font-bold transition-colors duration-300 ${
            ComponentPage === "Form" ? "text-green-500" : "text-white"
          }`}
        >
          Questions Creation Form
        </p>

        <p
          onClick={handleDisplayManageQuestion}
          className={`cursor-pointer font-bold transition-colors duration-300 ${
            ComponentPage === "ManageMent" ? "text-green-500" : "text-white"
          }`}
        >
          Manage Student Result
        </p>
         <button onClick={handleLogout} className="bg-green-600 hover:bg-green-700 m-3 text-white px-5 py-2 rounded-lg transition duration-300 text-sm md:text-base">
            Logout
       </button>
      </div>
       
      <div className="mt-4 mb-2 text-center">
        <p className="text-white text-sm">
          {ComponentPage === "Form"
            ? "Create and manage your questions here."
            : "Manage student results and view submissions."}
        </p>
      </div>

      
    </nav>
  );
}

export default LectureNavBar;
