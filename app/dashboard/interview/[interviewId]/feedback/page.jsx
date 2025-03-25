"use client"
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams, useRouter } from 'next/navigation'
import React ,{useEffect, useState} from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Feedback = () => {
    const params = useParams();
    const[feedbackList, setFeedbackList] = useState([]);
    const router = useRouter();

    useEffect(() => {
      if (params.interviewId) {
          console.log("Fetching data for interviewId:", params.interviewId);
          GetFeedback();
      } else {
          console.error("Error: interviewId is undefined");
      }
  }, [params.interviewId]);

    const GetFeedback = async () => {
      try {
          const result = await db
              .select()
              .from(UserAnswer)
              .where(eq(UserAnswer.mockIdRef, params.interviewId))
              .orderBy(UserAnswer.id);
  
          console.log("Fetched Data:", result);
  
          if (!Array.isArray(result)) {
              console.error("Error: Expected an array but got:", result);
              return;
          }
  
          setFeedbackList(result);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }


  return (
    <div className='p-10 '>
  
      {feedbackList?.length==0?
      <h2 className='font-bold text-xl'>No Interview Record Found</h2>
      :
      <>
        <h2 className='text-3xl fondt-bold text-green-500'>Congralutaions</h2>
        <h2 className='font-bold text-2xl'>Here is your interviews feedback</h2>
      <h2 className='text-violet-500 text-lg my-3'>Your Overall interview rating:<strong>7/10</strong></h2>
      <h2 className='text-sm text-gray-500'>Find below interview question with correct answer,Your answer and feedback for improvement</h2>
      {feedbackList && feedbackList.length > 0 ? (
    feedbackList.map((item, index) => (
        <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2 bg-blue-900 rounded-lg flex justify-between w-full text-left  gap-10'>
            {item.question}  <ChevronsUpDown className='h-10 w-10'/>
            </CollapsibleTrigger>
        <CollapsibleContent>
            <div className='flex flex-col gap-2'>
            <h2 className='text-red-900 p-2 border rounded-lg'><strong>Rating:</strong>
                    {item.rating}
                </h2>
                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-green-900'>
                    <strong>Answer:</strong>
                    {item.UserAns}
                </h2>
                <h2 className= 'p-2 rounded-lg bg-blue-50 text-sm text-blue-900'>
                    <strong>Feedback:</strong>
                    {item.feedback}
                </h2>
              </div>
        
            </CollapsibleContent>
        </Collapsible>
    ))
) : (
    <p>No feedback available.</p>
)}
        </>}
    
      <Button onClick ={()=>router.replace('/dashboard')}>Go Home</Button>
  
    
    </div>
  )
}

export default Feedback
