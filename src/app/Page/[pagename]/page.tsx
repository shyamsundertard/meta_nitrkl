'use client';
import { JsonArray } from '@prisma/client/runtime/library';
import EditComponent from 'components/UpdateAndDeleteComponent';
import React, { useEffect, useState } from 'react'

type PageInfo ={
  id: number;
  title: string;
  description: JsonArray;
  parentId: number
};

type Des={
  [x: string]: any;
  heading: string;
  detail: string;
  about: string;
}

const DynamicPage = ({params}:{params:{pagename:string}}) => {
  const [pageInfoDetails,setPageInfoDetails] = useState<PageInfo | undefined>();
  const [description, setDescription] = useState<Des[] | undefined>([]);
  const [heading, setHeading] = useState('');
  const [detail, setDetail] = useState('');
  const [isAdding, setIsAdding]= useState(false);
  const [index, setIndex] = useState(Number);
  const [showEditForm, setShowEditForm] = useState(false);
  const pagename = params?.pagename;

  const handleClick = ()=>{
    setIsAdding((prevIsAdding)=>!prevIsAdding);
  }
  const handleSectionClick = ()=>{
    setShowEditForm((prevIsAdding)=>!prevIsAdding);
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
        method: "PATCH",
        cache: "no-cache",
        headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
        heading,
        detail,
      })
      })
    } catch (error) {
      console.error('Error adding section', error);
    }
  };

  const firstDescription = description?.[0];
  const restOfDescription = description?.slice(1);

  return (
    <div className='w-full flex-center flex-col pb-8' >
      <h1 className='font-bold text-2xl text-center' >
       {pageInfoDetails?.title}
      </h1>
      <h1 className='font-serif text-center'>{firstDescription?.about}</h1>
      <div className='flex w-full justify-end'>
        {pageInfoDetails &&<button 
        className='flex border rounded-md bg-gray-200' 
        onClick={handleClick}
        >Add {pageInfoDetails?.title}
        </button>}
      </div>
      {showEditForm && <EditComponent pagename ={params?.pagename} index = {index} heading={heading} detail={detail} handleSectionClick={handleSectionClick} />}
      {isAdding && <form 
    className='flex flex-col p-2 border border-black rounded-lg'
    onSubmit={(e)=>{
       section();
      e.preventDefault();
      setIsAdding(false);
      console.log({pagename})
    }}>

      <input
      className='flex focus: outline-none'
      type='text'
      placeholder='Heading'
      onChange={(e)=> setHeading(e.target.value)}
      required
      />
      <input
      className='flex focus: outline-none'
      type='text'
      placeholder='Details'
      onChange={(e)=> setDetail(e.target.value)}
      required
      />
      <button
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[45px] h-[30px] rounded bg-blue-400'
      type='submit'
      >Add</button>
      </form>}
      {restOfDescription?.sort((a, b) => a.index - b.index) .map((item, index) => (
        <div key={index}
        onClick={()=>{
          handleSectionClick();
          setIndex(index);
          setHeading(item.heading);
          setDetail(item.detail);

        }}
        >
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