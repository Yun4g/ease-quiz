"use client"; 

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      router.push('/Login');
    } else {
     
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router]); 

  if (isLoading) {
    
    return (
      <div className="flex justify-center items-center h-screen bg-slate-300">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
        
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  
  return <div>{children}</div>;
}