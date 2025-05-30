"use client";
import { useEffect, useState } from "react";

interface Question {
  question: string;
  answer: string;
}

interface Course {
  courseTitle: string;
  coursesLevel: string;
  questionData : Question[]
}



export default function LecturerForms () {
 const [courseTitle, setCourseTitle] = useState("");
const [coursesLevel, setCoursesLevel] = useState("");
const [questions, setQuestions] = useState<Question[]>([{ question: "", answer: "" }]);
const [allCourses, setAllCourses] = useState<Course[]>([])



  const handleAddQuestion = () => {
   setQuestions([...questions, { question: "", answer: "" }])        
  }


  
  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const newCourseQuestion = {
          courseTitle : courseTitle,
         coursesLevel : coursesLevel,
        questionData  : questions
      }

      setAllCourses((prevCourses)=> [...prevCourses, newCourseQuestion])  
      setCourseTitle("")
      setCoursesLevel("")
      setQuestions([{ question: "", answer: "" }])

         
      

     
       alert("Course details saved successfully!");
  }

  useEffect(() => {
  console.log("Updated course list:", allCourses);
}, [allCourses]);
  


  return (
    <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">



      <main className="max-w-2xl mx-auto bg-white shadow-lg p-6 sm:p-10 rounded-2xl border border-green-600 space-y-10">

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-3">
            <input
             type="text"
              required
              value={courseTitle}
              onChange={(e)=> setCourseTitle(e.target.value)}
              placeholder="Course Title"
              name="CourseTitle"
              className="w-full px-4 py-3 border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />

            <input
              type="text"
              placeholder="Level e.g. 400lv"
              required
              value={coursesLevel}
              name="CourseLEVEL"
              onChange={(e)=> setCoursesLevel(e.target.value)}
              className="w-full px-4 py-3 border-2 border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />

        
          </div>
      
          <div className="space-y-6">
              
            {questions.map((q, index) => (
              <div key={index} className="space-y-4">
                  <div>
              <label className="block text-lg font-medium mb-2 text-green-700">
                Question
              </label>
              <textarea
               value={q.question}
                name="Questions"
                placeholder="Enter question here"
                className="w-full p-4 border-2 border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                onChange={(e) => {
                  const newCourses = [...questions];
                  newCourses[index].question = e.target.value;
                  setQuestions(newCourses);
                }}
              />
            </div>

            <div>
              <label className="block text-lg font-medium mb-2 text-green-700">
                Correct Answer
              </label>
              <textarea
               value={q.answer}
                name="CorrectAnswer"
                placeholder="Enter correct answer"
                className="w-full p-4 border-2 border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
                 onChange={(e) => {
                  const newQuestion = [...questions];
                  newQuestion[index].answer = e.target.value;
                  setQuestions(newQuestion);
                 } }
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">        
            </div>
              </div>
            ))} 
             <button
               onClick={ handleAddQuestion}
                type="button"
                className="bg-white border-2 border-green-500 text-green-700 hover:bg-green-100 transition py-2 px-6 rounded-lg text-base font-semibold"
              >
                + Add More Questions
              </button>
             <button
                type="submit"
                className="bg-green-700 text-white hover:bg-green-800 transition py-2 px-6 ms-1 rounded-lg text-base font-semibold"
              >
                Save course Questions
              </button>       
          </div>
         </form>
      </main>
    </section>
  );
}
