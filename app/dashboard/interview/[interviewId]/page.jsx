'use client';
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React,{  useEffect, useState} from 'react'
import Webcam from 'react-webcam';

const Interview= () => {
const params = useParams();
  const[interviewData, setInterviewData] = useState();
  const[webCamEnable,setWebCamEnabled] = useState(false);
      useEffect(()=>{
        console.log(params);
        GetInterviewDetails();
      },[])

      const GetInterviewDetails=async()=>{
        const result = await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))
        console.log(result);
          setInterviewData(result[0]);
        
      }

  return (
   
    <div className='my-10 '>
     <h2 className='font-bold text-2xl'>Lets's Get Started</h2>
     <div className='grid grid-cols-1 md:grid-cols-2'>
    
     <div className='flex flex-col my-5 gap-7'>
      <div className='flex flex-col p-5 rounded-lg border gap-5'>
     <h2 className='text-lg'><strong>Job Role/Job Position</strong> {interviewData?.jobPosition || "Loading.."}</h2>
     <h2 className='text-lg'><strong>Job Description/Tech Stack</strong> {interviewData?.jobDesc|| "Loading.."}</h2>
     <h2 className='text-lg'><strong>Job Experience</strong> {interviewData?.jobExperience || "Loading.."}</h2>
     </div>
     <div className='p-5 rounded-lg border-yellow-300 bg-yellow-200'>
    <h2 className='flex gap-2 items-center text-yellow-500'>  <Lightbulb/><span>Information</span></h2>
      <h2 className='mt-3 text-yellow'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
     </div>
     </div>
     <div>
     {webCamEnable? <Webcam 
     onUserMedia={()=>setWebCamEnabled(true)}
     onUserMediaError={()=>setWebCamEnabled(false)}
     mirrored={true}
     styles={{
      height:300,
      width:300,
     }}
     />
     :
     <>
      <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
      <Button variant="ghost" onClick={()=>setWebCamEnabled(true)} >Enable Web Cam and Micrphone</Button>
      </>
   }
     </div>
     </div>
     <div className='flex justify-end items-end'>
      <Link href ={'/dashboard/interview/'+params.interviewId+'/start'}>

  
     <Button>Start Interview</Button>
     </Link>
     </div>
 
    </div>
 
  )
}

export default Interview
