'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname();
    console.log(currentPath)

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
            className={classNames({
                'text-zinc-800': link.href === currentPath,
                'text-zinc-400': link.href !== currentPath,
                'hover:text-zinc-900 transition-colors':true
            })}
            href={link.href}>
                {link.label}</Link>)}
        </ul>
    </nav>
  )
}

export default NavBar