import LectureNavBar from "./lecturerNav";


export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div >
       <div className=" flex flex-col items-center max-h-screen h-screen overflow-x-hidden bg-slate-500/30 overflow-y-scroll">
        <div className=" flex justify-center w-full p-5 ">
           <LectureNavBar/>
        </div>
        <div className=" w-full h-screen ">
        {children}
        </div>
      </div>
    </div>
  );
}