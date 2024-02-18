'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Spinner from '../../../components/Spinner';

const NewDataPage = () => {
    const [title,setTtitle] = useState('');
    const [about,setAbout] = useState('');
    const [isSubmitting, setSubmitting]=useState(false);

    const router = useRouter();

    async function addData() {
        try {
            await fetch('http://localhost:3000/api/data',{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({
                    title,
                    description:[{
                        tag:"About",
                        about
                    }],
                    parentId: 838681
                }),
            }) ;
            router.push(`http://localhost:3000/Page/${title}`);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='flex justify-center w-full '>
        <form 
        className=' flex flex-col w-[250px] h-[130px] rounded-xl pt-5 mt-5 border max-w-200 min-w-200 '
        onSubmit={(e)=> {
            addData();
            e.preventDefault();
            }} >
        <div className='flex flex-col pl-6 pt-1 pb-1'>
        <input
        className='flex focus:outline-none'
        type= "text"
        placeholder='Title of Page'
        onChange={(e)=>setTtitle(e.target.value)}
        required
        />
        <input
        className='flex break-words focus:outline-none max-w-[200px]'
        type= "text"
        placeholder='About'
        onChange={(e)=>setAbout(e.target.value)}
        required
        />
        </div>
        <button disabled={isSubmitting}
        className='flex self-end items-center border ml-2 p-1 mb-1 w-[65px] h-[30px] rounded bg-blue-400'
        type='submit'
        >Submit {isSubmitting && <Spinner/>}</button>
        </form>
    </div>
  )
}

export default NewDataPage