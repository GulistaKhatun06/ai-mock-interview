"use client"
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { chatSession } from '@/utils/GeminiAIModal'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'

import { Mic, StopCircle, Webcam } from 'lucide-react'
import moment from 'moment'
import Image from 'next/image'
import React, { useEffect,useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text'
import { toast } from 'sonner'

const RecordAnswerSection = ({mockInterviewQuestion, activeQuestionIndex, interviewData}) => {
    const[userAnswer, setUserAnswer] = useState('');
    const {user} = useUser();
    const[loading,setLoading]= useState(false);

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((results)=>(
            setUserAnswer(prevAns=>prevAns+results?.transcript)
        ))
      },[results])

      useEffect(()=>{
         if(!isRecording&&userAnswer.length>10){
          updateUserAnswer();
         }
       
      },[userAnswer])

      const StartStopRecording =async ()=>{
        if(isRecording){
            stopSpeechToText();

              }
               
    else{
            startSpeechToText();
        }
      }

    const updateUserAnswer= async()=>{
      console.log(userAnswer)
      setLoading(true);
      const feedbackPrompt = "Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+
      ", User Answer:"+ userAnswer+",Depends on questions and user answer for give interview quwstion"+
      "please give us rating for answer and feedback as area of improvement if any"+
      "in just 3 tp 5 lines to improve it in JSON format with rating and feedback field ";

      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
      console.log(mockJsonResp);
      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      const resp = await db.insert(UserAnswer)
      .values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
       correctAns:mockInterviewQuestion[activeQuestionIndex]?.correctAns,
       userAns:userAnswer,
       feedback:JsonFeedbackResp?.feedback,
       rating:JsonFeedbackResp?.rating,
       userEmail:user?.primaryEmailAddress?.emailAddress,
       createdAt:moment().format('DD-MM-YYYY ')
      })

      if(resp){
        toast('User Answer Recorded successfully')
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
     
      setLoading(false);


    }
    

  return (

 
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col my-20 bg-black justify-center items-center rounded-lg p-5'>
     <Image src ={'/webcam.png'} width ={300} height ={300} alt ="photo" className='absolute'/>
     <Webcam  
     style={{
        height:300,
        width:'100%',
        zIndex:1
        
     }}
        />
      
    </div>
    <Button  disabled ={loading} variant ="outline" className="my-10"
    onClick ={StartStopRecording}>
        {isRecording?
        <h2 className='text-red-600 animate-plus flex gap-2 item-center'>
          <StopCircle/>Stop recording
           
            </h2>

            :
            <h2 className='text-primary flex gap-2 items-center'>
            <Mic/>   
            Record Answer
            </h2>
          
            
        
       }</Button>
      
 
    </div>
  )
}

export default RecordAnswerSection
