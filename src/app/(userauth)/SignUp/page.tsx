"use client";
import z from 'zod';
import React, { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';




export default function SignUp() {
    const signUpSchema = z.object({
        role: z.enum(['student', 'lecturer']),
        email: z.string().email('email is required'),
        password: z.string().min(6, 'password canot be less than 6'),
        matricNo: z.string().optional(),
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();



    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const data = {
            role: formData.get('role'),
            email: formData.get('email'),
            password: formData.get('password'),
            matricno: formData.get('matricNo'),
            disability: formData.get('disability')
        };

        console.log('Form data:', data);
        const result = signUpSchema.safeParse(data);

        if (!result.success) {
            const fieldErrors: { [key: string]: string } = {};
            result.error.errors.forEach(error => {
                fieldErrors[error.path[0]] = error.message;
            });
            setErrors(fieldErrors);
            return;
        }

        try {
            setIsLoading(true);
            setErrors({});
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error creating user:', errorData);

                if (errorData.message) {
                    setErrors({ general: errorData.message });
                } else {
                    setErrors({ general: 'Failed to create user.' });
                }
                return;
            }
           
            alert('User created successfully');
            router.push('/Login');
            setErrors({});
            signUpSchema.parse(data);
            console.log('Form data is valid:', data);
        } catch (error) {
            setIsLoading(false);
            setErrors({ general: 'An error occurred while creating  user try again' });
            alert('An error occurred while creating the user.');
            console.error('Error during signup:', error);
        } finally {
            setIsLoading(false);
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
                {
                    isLoading && (
                        <div className="flex items-center justify-center mb-4">
                            <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.364A8.001 8.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.574zM12 20a8.001 8.001 0 01-6.364-2.93l-3.93 1.574A11.95 11.95 0 0012 24v-4zm6.364-2.93A8.001 8.001 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.636-1.568zM20 12a8.001 8.001 0 01-2.93-6.364l3.636-1.568A11.95 11.95 0 0024 12h-4z"></path>
                            </svg>
                        </div>
                    )

                }

                {
                    errors.general && (
                        <p className="text-red-500 text-sm mb-4">{errors.general}</p>
                    )
                }
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
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
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
                            className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="E.g Blind"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
                    >
                        {isLoading ? 'Creating account' : 'Sign Up'}
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
