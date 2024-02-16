'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Spinner from '../../../components/Spinner';

const NewDataPage = () => {
    const [title,setTtitle] = useState('');
    const [heading,setHeading] = useState('');
    const [info,setInfo] = useState('');
    const [isSubmitting, setSubmitting]=useState(false)

    const router = useRouter();

    async function addData() {
        try {
            await fetch('../../api/data',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    title,
                    description:[{
                       heading,
                       info
                    }]
                }),
            }) ;
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='flex'>
        <form 
        className='flex-c border max-w-100'
        onSubmit={(e)=> {
            addData();
            setSubmitting(true);
            router.push('/more');
            e.preventDefault();
            }} >
        <div className='flex pl-6 pt-1 pb-1 '>
        <input
        className='flex focus:outline-none'
        type= "text"
        placeholder='Enter title'
        onChange={(e)=>setTtitle(e.target.value)}
        required
        />
        </div>
        <div className='flex-c  pl-3 space-y-1'>
        <div className='flex  pl-3'>
        <input
        className='flex focus:outline-none'
        type= "text"
        placeholder='Enter Heading'
        onChange={(e)=>setHeading(e.target.value)}
        required
        />
        </div>
        <div className='flex pl-3'>
        <input
        className='flex pb-3 focus:outline-none'
        type= "text"
        placeholder='Enter Information'
        onChange={(e)=>setInfo(e.target.value)}
        required
        />
        </div>
        </div>
        <button disabled={isSubmitting}
        className='flex border ml-2 p-1 mb-1 rounded bg-blue-400'
        type='submit'
        >Submit {isSubmitting && <Spinner/>}</button>
        </form>
    </div>
  )
}

export default NewDataPage