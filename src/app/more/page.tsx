'use client';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const MorePage = () => {
  const [details, setDetails]= useState([]);

  useEffect(()=>{
    const getData = async() => {
      const response = await fetch('http://localhost:3000/api/data',{
        method: "GET"
      });
      const data =await response.json();
      setDetails(data);
    }
    getData();
  },[])

  return (
    <div>
      <div>
        {details.map((data)=>(
          <div key={data.id}>
            <div>{data.title}</div> 
          </div>
        ))}
      </div>
      <button className='text-white border rounded bg-sky-600 p-1'><Link href='/more/new' >New Data</Link></button>
    </div>
  )
}

export default MorePage