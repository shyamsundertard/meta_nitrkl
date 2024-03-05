'use client';
import { JsonArray } from '@prisma/client/runtime/library';
import UpdateComponent from 'components/UpdateComponent';
import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

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
  const [isMenuVisivble, setIsMenuVisible] = useState(false);

  const pagename = params?.pagename;

  const toggleMenu=()=>{
    setIsMenuVisible(!isMenuVisivble);
  }

  const handleClick = ()=>{
    setIsAdding((prevIsAdding)=>!prevIsAdding);
  }
  const handleSectionClick = ()=>{
    setShowEditForm((prevshowEditForm)=>!prevshowEditForm);
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

  const addSubpage = async ()=>{
    try {
      await fetch(`http://localhost:3000/api/page/${pagename}`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
        title:heading,
      })
    })
    } catch (error) {
      console.error('Error adding subPage', error);
    }
  }

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
      });
    } catch (error) {
      console.error('Error adding section', error);
    }
  };

  const remove = async ()=>{
    try {
      await fetch(`http://localhost:3000/api/page/${pagename}`,{
        method: "DELETE",
        cache: "no-cache",
        headers:{
          "Content-Type":"application/json",
      },
      body:JSON.stringify({
        index
      })
      });
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
      {showEditForm &&
      <div className='fixed top-0 left-0 min-w-[100%] min-h-[100%] bg-black bg-opacity-50 h-screen '>
         <UpdateComponent pagename ={params?.pagename} index = {index} heading={heading} detail={detail} handleSectionClick={handleSectionClick} />
        </div>}
      {isAdding && <div className='fixed top-0 left-0 min-w-[100%] min-h-[100%] bg-black bg-opacity-50 h-screen '>
      <form 
    className='flex flex-col p-2 w-[700px] left-[30%] top-[200px] min-h-[300px] bg-white border rounded-lg fixed'
    onSubmit={(e)=>{
       section();
      e.preventDefault();
      setIsAdding(false);
      console.log({pagename})
    }}>
      <strong>
      <input
      className='flex focus: outline-none px-2'
      type='text'
      placeholder='Name'
      onChange={(e)=> setHeading(e.target.value)}
      required
      />
        </strong>
      <textarea
      className='flex focus: outline-none w-full h-[240px] pt-4 px-2 resize-none'
      placeholder='Detail'
      onChange={(e)=> setDetail(e.target.value)}
      required
      />
      <div className='flex flex-row justify-end' >
      <button
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[60px] h-[30px] rounded bg-gray-200'
      onClick={()=>{
        handleClick();
      }}
      >Cancel</button>
      <button
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[45px] h-[30px] rounded bg-gray-200'
      type='submit'
      >Add</button>
      </div>
      </form>
      </div>}
      <div className='flex py-3'>
      {restOfDescription?.map((item, index) => (
        <div className='flex'
        key={index}
        onClick={()=>{
          setIndex(index++);
          setHeading(item.heading);
          setDetail(item.detail);

        }} >
          <div className='flex flex-col justify-center pt-2 px-3' >
          <div className='flex flex-row justify-between'>
            <p><strong className='border-b border-gray-400' >{item.heading}:</strong></p> 
            <div className='relative inline-block'>
              <div 
              onMouseEnter={toggleMenu}
              className='flex items-center justify-end cursor-pointer'
            >
              <BsThreeDotsVertical />
               </div>
            {isMenuVisivble && 
            <div 
            onMouseLeave={toggleMenu}
            className='absolute top-8 right-0 bg-white text-nowrap border shadow-lg rounded cursor-pointer'>
              <div 
              className='hover:bg-gray-200 px-2'
              onClick={(e)=>{
              handleSectionClick();
              e.preventDefault()
              }} 
                >Edit</div>
                <div
                className='hover:bg-gray-200 px-2'
                onClick={(e)=>{
                  remove();
                  e.preventDefault()
                }}
                >Delete</div>
                <div
                className='hover:bg-gray-200 px-2'
                onClick={(e)=>{
                  addSubpage();
                  e.preventDefault()
                }}
                >Create Page</div>
            </div>}
            </div>
            </div>
          <p className='flex pt-2 border-b border-gray-500'>{item.detail} </p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default DynamicPage