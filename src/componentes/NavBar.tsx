import Link from "next/link";





export default function NavBar() {
      
    return(
     <header className=" flex items-center justify-between p-2 md:p-4">
        <div>
           <h1 className=" text-2xl md:text-4xl text-white font-serif">EasyQUIZ</h1> 
        </div>
        <div> 
        <Link href="/Login">
           <button className="bg-green-500 font-semibold text-white h-14 w-28 rounded-xl">Sign In</button> 
        </Link>
        </div>
     </header>
    )
}