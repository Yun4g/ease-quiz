"use client";
import z from 'zod';
import React, { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";




export default function SignUp() {
    const signUpSchema = z.object({
        role: z.enum(['student', 'lecturer']),
        email: z.string().email('email is required'),
        password: z.string().min(6, 'password canot be less than 6'),
        matricNo: z.string().optional(),
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = {
            role: formData.get('role'),
            email: formData.get('email'),
            password: formData.get('password'),
            matricNo: formData.get('matricNo'),
            disabilty: formData.get('disability')
        };

        console.log('Form data:', data);
        const result = signUpSchema.safeParse(data);

        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {};
            result.error.errors.forEach(error => {
                fieldErrors[error.path[0]] = error.message;
            });
            console.error('Validation errors:', fieldErrors);
            return;
            setErrors(fieldErrors);
        }

        try {
            signUpSchema.parse(data);
            console.log('Form data is valid:', data);
        } catch (error) {
            console.error('Validation errors:', error);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen px-4 bg-gray-100/70"
            style={{
                backgroundImage: "url('/heroImage.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="bg-white border border-green-500 p-6 sm:p-8 rounded-lg shadow-md shadow-green-400 w-full max-w-sm sm:max-w-md md:max-w-lg">
                <h2 className="text-2xl font-bold font-sans mb-6 text-center">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <select
                            name="role"
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="" disabled selected>Select your role</option>
                            <option value="student">Student</option>
                            <option value="lecturer">Lecturer</option>
                        </select>
                        {errors.role && (
                            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            name="email"
                            type="email"
                            id="email"
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your email"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                required
                                className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600"
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye  : faEyeSlash } />
                            </button>
                        </div>

                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="matricNo">Matric No (Students Only)</label>
                        <input
                            name="matricNo"
                            type="text"
                            id="matricNo"
                            className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Matric no"
                        />
                        {errors.matricNo && (
                            <p className="text-red-500 text-sm mt-1">{errors.matricNo}</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="" className="block text-sm font-medium mb-2">specify any disabilities if any</label>
                        <input
                            type="text"
                            id="disability"
                            name="disability"
                            required
                            className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="E.g Blind"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/Login" className="text-green-600 hover:underline">Login</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
