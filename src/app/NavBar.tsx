import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    const links=[
        {label:'Dashboard', href:'/'},
        {label:'About', href:'/about'}
    ] 

  return (
    <nav className='flex space-x-7 border-b mb-5 px-7 h-10'>
        <Link href="/" >Logo</Link>
        <ul className='flex space-x-7'>
            {links.map(link=><Link 
            key={link.href} 
            className='text-zinc-500 hover:text-zinc-800 transition-colors'
            href={link.href}>
                {link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default NavBar