import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
   <div  className="flex flex-col items-center  justify-center  gap-20 text-4xl font-bold p-20">
    <h2>Welcome</h2>
    <Link href={'/dashboard'} className=" items-center text-blue-800">Click to start Interview</Link>

   </div>
  );
}