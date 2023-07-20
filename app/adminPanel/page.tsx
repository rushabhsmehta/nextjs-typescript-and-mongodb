'use client'
import Link from 'next/link'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

export default function adminPanel() {  
  return (
    <div>    
    <Navbar/>
      <Link href='/posts' className='btn btn-ghost underline'>
        Posts
      </Link> 
        <br/>
      <Link href='/locations' className='btn btn-ghost underline'>
        Locations
      </Link>
      <Footer/>
    </div>    
  )
}