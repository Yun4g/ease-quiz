'use client';
import React, { useRef } from 'react';

interface Column {
  label: string;
  key: keyof Student;
}

interface Student {
  studentName: string;
  StudentMatNo: string;
  course: string;
  score: string;
}

function ManageResults() {
  const pdFref = useRef<HTMLDivElement>(null);

  const StudentData = [
    { studentName: 'David', StudentMatNo: 'u2021/5570168', course: 'csc 497', score: '50' },
    { studentName: 'David', StudentMatNo: 'u2021/5570168', course: 'csc 497', score: '50' },
    { studentName: 'David', StudentMatNo: 'u2021/5570168', course: 'csc 497', score: '50' }
  ];

  const columns: Column[] = [
    { label: 'student Name', key: 'studentName' },
    { label: 'Mat-No', key: 'StudentMatNo' },
    { label: 'course Title', key: 'course' },
    { label: 'studentScore ', key: 'score' }
  ];

  const handleDownload = async () => {
    if (!pdFref.current) return;

    // Dynamically import html2pdf only on client at runtime
    const html2pdf = (await import('html2pdf.js')).default;

    html2pdf().from(pdFref.current).save("student-data.pdf");
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Manage Results</h1>

        <div ref={pdFref} className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-left text-green-800">
            <thead className="bg-green-600 text-white">
              <tr>
                {columns.map((column, index) => (
                  <th key={index} className="px-6 py-3 font-semibold uppercase">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-green-100">
              {StudentData.map((student, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-green-100 transition duration-200">
                  {columns.map((column, colIndex) => (
                    <td key={colIndex} className="px-6 text-center py-4 whitespace-nowrap">
                      {student[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="w-[180px] mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
      >
        Download Data
      </button>
    </div>
  );
}

export default ManageResults;
