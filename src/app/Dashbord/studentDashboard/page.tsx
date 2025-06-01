"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";


interface Course {
  _id: string;
  courseTitle: string;
  level: string;
}

export default function StudentDashBoard() {
   const [StudentCourse, setStudentCourse] = useState<Course[]>([]);
   const [loading, setLoading] = useState<boolean>(false);
 


      const handleFetchCourses = async () => {
        setLoading(true);
        console.log('Fetching courses...');
        try {
          const response = await fetch('/api/getCourse');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setStudentCourse(data);
          console.log('Fetched courses:', data);
          return data;
        } catch (error) {
          console.error('Error fetching courses:', error);
          setLoading(false);
          return [];
          
        } finally {
          setLoading(false);
        }
      }
  useEffect(() => {
    handleFetchCourses();
  }, []);


  return (
    <section className="min-h-screen w-full bg-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl text-green-600 font-serif">EasyQUIZ</h1>
          <Link href={'/Login'} className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition duration-300 text-sm md:text-base">
            Logout
          </Link>
        </header>

        
        <section className="border-t-2 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Courses</h2>

          {
            loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-600">Loading courses...</p>
              </div>
            ) : StudentCourse.length === 0 ? (
              <p className="text-gray-600">No courses available at the moment.</p>
            ) : null
          }

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-[90%]  mx-auto">
            
            {StudentCourse.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden p-3"
              >
                
                <div className="bg-green-700 flex justify-center  rounded items-center h-40">
                  <Image
                    src="/graduationCap.png"
                    alt="Course Image"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>

                
                <div className="p-4 flex flex-col justify-between h-40">
                  <h3 className="text-xl font-bold text-green-800">{course.courseTitle}</h3>
                  <p className="font-semibold text-gray-700">Level: {course.level}</p>
                  <Link
                    href={`/Dashbord/studentDashboard/${course._id}`}
                    
                    className="mt-4 inline-block text-center bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-300"
                  >
                    Start Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
