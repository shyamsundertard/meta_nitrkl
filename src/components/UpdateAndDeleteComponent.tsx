import React, { useState } from 'react'

const EditComponent = (props: {
  handleSectionClick: any;pagename: string; index:Number; heading: string; detail: string;
}) => {
    const [heading ,setHeading]  = useState(props.heading);
    const [detail ,setDetail]  = useState(props.detail);

    const update = async ()=>{
      try {
        await fetch(`http://localhost:3000/api/page/${props.pagename}`,{
          method: "PUT",
          headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
          heading,
          detail,
          index: props.index
        })
        });
        props.handleSectionClick();
      } catch (error) {
        console.error('Error adding section', error);
      }
    };

    const remove = async ()=>{
      try {
        await fetch(`http://localhost:3000/api/page/${props.pagename}`,{
          method: "DELETE",
          cache: "no-cache",
          headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
          index: props.index
        })
        });
        props.handleSectionClick();
      } catch (error) {
        console.error('Error adding section', error);
      }
    };

  return (
    <div> 
    <form 
    className='flex flex-col p-2 border border-black rounded-lg'
    >

      <input
      className='flex focus: outline-none'
      type='text'
      defaultValue={props.heading}
      onChange={(e)=> setHeading(e.target.value)}
      required
      />
      <input
      className='flex focus: outline-none'
      type='text'
      defaultValue={props.detail}
      autoFocus
      onChange={(e)=> setDetail(e.target.value)}
      required
      />
      <button
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[120px] h-[30px] rounded bg-blue-400'
      onClick={(e)=>{
        remove();
       e.preventDefault();
     }}
      >Delete</button>
      <button
      className='flex self-end items-center border ml-2 p-1 mb-1 w-[120px] h-[30px] rounded bg-blue-400'
      onClick={(e)=>{
        update();
       e.preventDefault();
     }}
      >Save Changes</button>
      </form>
      </div>
  )
}

export default EditComponent