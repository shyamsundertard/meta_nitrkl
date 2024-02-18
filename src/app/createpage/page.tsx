'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

type Data = {
  id: number;
  title: string;
};

const MorePage = () => {
  const [details, setDetails]= useState<Data[]>([]);

  useEffect(()=>{
    const getData = async() => {
      const response = await fetch('http://localhost:3000/api/data',{
        method: "GET",
        cache: 'no-cache'
      });
      const data =await response.json() as Data[];
      setDetails(data);
    }
    getData();
  },[])

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        {details.map((data)=>(
          <div key={data.id}>
            <div>{data.title}</div> 
          </div>
        ))}
      </div> 
      <button className='text-white border rounded bg-sky-600 p-1 h-[30px]'><Link href='/createpage/new' >Create</Link></button>
    </div>
  )
}

export default MorePage