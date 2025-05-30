"use client";
import { useRouter } from 'next/navigation';
import z from 'zod';
import { FormEvent, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginSchema = z.object({
  email: z.string().email('Invalid email addresss').min(1, 'Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long').max(20, 'Password cannot exceed 20 characters'),
});

type FormData = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export default function SignIn() {
  const router = useRouter();
   const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
   const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const data: FormData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };
  
    console.log('Form data:', data);
    const result = LoginSchema.safeParse(data);

    if(!result.success) {
     const fieldErrors: { email?: string; password?: string } = {};
     result.error.errors.forEach(error => {
        if (error.path[0] === 'email') {
          fieldErrors.email = error.message;
        } else if (error.path[0] === 'password') {
          fieldErrors.password = error.message;
        }
      });
      setErrors(fieldErrors);
      console.error('Validation errors:', fieldErrors);
      return;
    }

  
    try {
       
      console.log('Form data is valid:', data);
      router.push('/Dashbord/studentDashboard');
    } catch (error) {
      console.error('Validation errors:', error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 bg-gray-100/70"
      style={{
        backgroundImage: "url('/heroImage.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white border border-green-500 p-6 sm:p-8 rounded-lg shadow-md shadow-green-400 w-full max-w-[90%] sm:max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-green-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
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
       
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?
            <a href="/SignUp" className="text-green-600 hover:underline">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}