"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";




declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}
type SpeechRecognitionEvent = Event & {
  results: SpeechRecognitionResultList;
};

type SpeechRecognitionErrorEvent = Event & {
  error: string;
};

interface Question {
  question: string;
  answer: string;
}

interface Course {
  courseTitle: string;
  coursesLevel: string;
  questionData: Question[];
}

const mockCourses: Course[] = [
  {
    courseTitle: "CSC 497",
    coursesLevel: "400",
    questionData: [
      { question: "What is React?", answer: "A JavaScript library" },
      { question: "What is JSX?", answer: "JavaScript XML" },
      { question: "What is useState used for?", answer: "State management" },
    ],
  },
];

export default function StudentQuiz() {
  const [selectedCourse] = useState<Course>(mockCourses[0]);
  const [studentAnswers, setStudentAnswers] = useState<string[]>(
    Array(selectedCourse.questionData.length).fill("")
  );
  const [studentName, setStudentName] = useState("");
  const [studentMatNo, setStudentMatNo] = useState("");
  const [score, setScore] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState<number | null>(null);
  const router = useRouter();


  const [isSpeechSupported, setIsSpeechSupported] = useState(false);

useEffect(() => {
  setIsSpeechSupported('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}, []);


  const handleChangeAnswer = (index: number, value: string) => {
    const newAnswers = [...studentAnswers];
    newAnswers[index] = value;
    setStudentAnswers(newAnswers);
  };

  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      return true;
    } catch (error) {
      console.error("Microphone permission denied:", error);
      return false;
    }
  };

  const handleAudioAnswer = async (index: number) => {
    if (!!isSpeechSupported) {
      alert("Your browser doesn't support speech recognition. Try Chrome or Edge.");
      return;
    }

    const hasPermission = await checkMicrophonePermission();
    if (!hasPermission) {
      alert("Please allow microphone access to use voice input.");
      return;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(index);

      recognition.onresult = (e: SpeechRecognitionEvent) => {
        const transcript = e.results[0][0].transcript;
        const newAnswers = [...studentAnswers];
        newAnswers[index] = transcript;
        setStudentAnswers(newAnswers);
        setIsRecording(null);
      };

      recognition.onerror = (e: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", e.error);
        alert(`Error: ${e.error}`);
        setIsRecording(null);
      };

      recognition.onend = () => {
        setIsRecording(null);
      };

      recognition.start();
    } catch (error) {
      console.error("Audio recording failed:", error);
      alert("Audio recording failed. Please try again.");
      setIsRecording(null);
    }
  };

  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text-to-speech not supported in this browser.");
    }
  };

  const handleSubmit = async () => {
    let correct = 0;
    selectedCourse.questionData.forEach((q, i) => {
      if (q.answer.trim().toLowerCase() === studentAnswers[i].trim().toLowerCase()) {
        correct += 10;
      }
    });
    setScore(correct);

    const result = {
      studentName,
      StudentMatNo: studentMatNo,
      course: selectedCourse.courseTitle,
      score: `${correct}`,
    };
    console.log(result)

    alert(score + '' + selectedCourse.questionData.length * 10)

    setTimeout(() => {
      router.push("/Dashbord/studentDashboard");
    }, 6000);


    try {
      const res = await fetch("/api/save-result", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),

      });

      if (!res.ok) {
        throw new Error("Failed to submit result");
      }

      alert(score + '' + selectedCourse.questionData.length * 10)
    } catch (error) {
      console.error("Submission error:", error);

    }
  };



  return (
    <section className={`min-h-screen bg-gray-50 py-10 px-4 sm:px-8 ${score ? 'overflow-hidden' : 'overflow-auto'} `}>
      {score !== null && (

        <div className="mt-6 p-4 bg-green-100 rounded-lg text-xl font-bold text-green-700 animate-fade-in">
          You scored {score}/{selectedCourse.questionData.length * 10}
          <div className="mt-2 text-sm font-normal text-green-600">
            Redirecting to dashboard...
          </div>
        </div>


      )}

      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl text-green-600 font-serif">EasyQUIZ</h1>
          <Link href="/Login" className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition duration-300 text-sm md:text-base">
            Logout
          </Link>
        </header>

        <section className="border-t-2 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {selectedCourse.courseTitle} - Level {selectedCourse.coursesLevel}
          </h2>

          <div className="mb-6 grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full px-4 py-3 border-2 outline-none border-green-500 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Matric Number"
              value={studentMatNo}
              onChange={(e) => setStudentMatNo(e.target.value)}
              className="w-full px-4 py-3 border-2 outline-none border-green-500 rounded-lg"
              required
            />
          </div>

          {selectedCourse.questionData.map((q, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-medium text-green-800">
                  {index + 1}. {q.question}
                </h3>
                <button
                  onClick={() => speakQuestion(q.question)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="Listen to question"
                  title="Listen to question"
                >
                  🔊
                </button>
              </div>
              <textarea
                className="w-full p-3 border-2 border-green-400 outline-none rounded-lg min-h-[100px]"
                placeholder="Your Answer"
                value={studentAnswers[index]}
                onChange={(e) => handleChangeAnswer(index, e.target.value)}
                required
              />
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleAudioAnswer(index)}
                  disabled={isRecording !== null}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition ${isRecording === index
                    ? "bg-red-600 text-white animate-pulse"
                    : isRecording !== null
                      ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800 text-white"
                    }`}
                >
                  {isRecording === index ? (
                    <>
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                      </span>
                      Listening...
                    </>
                  ) : (
                    <>
                      🎤 Answer with Voice
                    </>
                  )}
                </button>

              </div>
            </div>
          ))}

          <button
            onClick={handleSubmit}
            disabled={!studentName || !studentMatNo || studentAnswers.some(a => !a)}
            className={`bg-green-700 text-white px-6 py-2 rounded-lg text-base font-semibold transition mt-4 ${!studentName || !studentMatNo || studentAnswers.some(a => !a)
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-800"
              }`}
          >
            Submit Answers
          </button>

          {score !== null && (

            <div className="mt-6 p-4 bg-green-100 rounded-lg text-xl font-bold text-green-700 animate-fade-in">
              You scored {score}/{selectedCourse.questionData.length * 10}
              <div className="mt-2 text-sm font-normal text-green-600">
                Redirecting to dashboard...
              </div>
            </div>


          )}
        </section>
      </div>
    </section>
  );
}