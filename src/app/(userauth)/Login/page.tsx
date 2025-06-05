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
  const [errors, setErrors] = useState<{ email?: string; password?: string; message?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    const data: FormData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    console.log('Form data:', data);
    const result = LoginSchema.safeParse(data);

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

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setErrors({ message: responseData.message || 'Login failed' });
        setIsLoading(false);
        return;
      }

      console.log('Login successful:', responseData);
    
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('role', responseData.role);

      if (responseData.role === 'student') {
        router.push('/Dashbord/studentDashboard');
      } else if (responseData.role === 'lecturer') {
        router.push('/Dashbord/lecturerDashbord');
      }

    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
      setErrors({ message: 'An unexpected error occurred. Please try again.' });
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
        {isLoading && (
          <div className="flex items-center justify-center mb-4">
            <svg className="animate-spin h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2.93 6.364A8.001 8.001 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.93-1.574zM12 20a8.001 8.001 0 01-6.364-2.93l-3.93 1.574A11.95 11.95 0 0012 24v-4zm6.364-2.93A8.001 8.001 0 0120 12h4c0 3.042-1.135 5.824-3 7.938l-3.636-1.568zM20 12a8.001 8.001 0 01-2.93-6.364l3.636-1.568A11.95 11.95 0 0024 12h-4z"></path>
            </svg>
          </div>
        )}
        
       
        {errors.message && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {errors.message}
          </p>
        )}
        
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
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition duration-200 disabled:opacity-50"
          >
            {isLoading ? 'Validating account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Dont have an account?
            <a href="/SignUp" className="text-green-600 hover:underline"> Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
}