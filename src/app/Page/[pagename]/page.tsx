'use client';
import { JsonArray } from '@prisma/client/runtime/library';
import React, { useEffect, useState } from 'react'

type PageInfo ={
  id: number;
  title: string;
  description: JsonArray;
  parentId: number
};

type Des={
  heading: string;
  detail: string;
  about: string;
}

const DynamicPage = ({params}:{params:{pagename:string}}) => {
  const [pageInfoDetails,setPageInfoDetails] = useState<PageInfo | undefined>();
  const [description, setDescription] = useState<Des[] | undefined>([]);
  const [heading, setHeading] = useState('');
  const [detail, setDetail] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [isAdding, setIsAdding]= useState(false);
  const pagename = params?.pagename;

  const handleClick = ()=>{
    setIsAdding((prevIsAdding)=>!prevIsAdding);
  }

  useEffect(()=>{
    const getPage =async()=>{

      try {
        const response = await fetch(`http://localhost:3000/api/page/${params?.pagename}`,{
          method: "GET",
          cache: 'no-cache'
        });
  
        if (!response.ok) {
          console.error(`Error fetching data. Status: ${response.status}`);
          return;
        }
  
        const pageInfo = await response.json() as PageInfo;
        setPageInfoDetails(pageInfo);
        if (Array.isArray(pageInfo.description)) {
          const desArray: Des[] = pageInfo.description.map((item) => item as Des);
          setDescription(desArray);
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getPage();
  },[params?.pagename,description?.length])

  const section = async ()=>{
    try {
      await fetch(`http://localhost:3000/api/page/${pagename}`,{
        method: "PUT",
        cache: "no-cache",
        headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
        heading,
        detail
      })
      })
    } catch (error) {
      console.error('Error adding section', error);
    }
  };

  return (
    <div className='w-full flex-center flex-col pb-8' >
      <h1 className='font-bold text-2xl text-center' >
       {pageInfoDetails?.title}
      </h1>
      <div className='flex w-full justify-end'>
        <button 
        className='flex border rounded-md bg-gray-200' 
        onClick={handleClick}
        >Add Section
        </button></div>
        {isAdding && <form 
    className='flex flex-col p-2 border border-black rounded-lg'
    onSubmit={(e)=>{
       section();
      // setSubmitting(true);
      e.preventDefault();
      setIsAdding(false);
      console.log({pagename})
    }}>

      <input
      className='flex focus: outline-none'
      type='text'
      placeholder='Add heading'
      onChange={(e)=> setHeading(e.target.value)}
      required
      />
      <input
      className='flex focus: outline-none'
      type='text'
      placeholder='Write details'
      onChange={(e)=> setDetail(e.target.value)}
      required
      />
      <button disabled={isSubmitting}
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[65px] h-[30px] rounded bg-blue-400'
      type='submit'
      >Add</button>
    </form>}
      {description?.map((item, index) => (
        <div key={index}>
          <div className='flex flex-col justify-center border-b border-black pt-2 pl-3' >
          <p><strong className='border-b border-sky-400' >{item.heading}:</strong></p> 
          <p className='flex pt-2'>{item.detail} </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DynamicPage