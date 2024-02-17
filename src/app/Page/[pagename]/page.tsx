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
  about: string;
}

const DynamicPage = ({params}:{params:{pagename:string}}) => {
  const [pageInfoDetails,setPageInfoDetails] = useState<PageInfo | undefined>();
  const [description, setDescription] = useState<Des[] | undefined>([]);

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
  },[params?.pagename])
  return (
    <div className='w-full flex-center flex-col' >
      <h1 className='font-bold text-2xl text-center' >
       {pageInfoDetails?.title}
      </h1>
      {description?.map((item, index) => (
        <div key={index}>
          <div className='flex justify-center' >
          <p><strong>{item.heading}:</strong>{item.about} </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default DynamicPage