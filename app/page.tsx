'use client'
import Link from 'next/link'
import Header from 'components/Header'
import Navbar from 'components/Navbar'
import HeroSection from 'components/HeroSection'
import Footer from 'components/Footer'
import PopularDestinations from 'components/PopularDestinations'
import PopularLocations from 'components/PopularLocations'
import PopularTours from 'components/PopularTours'
import FeaturedLocations from 'components/FeaturedLocations'

export default function Home() {

  
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <PopularDestinations/>
    <br/>
    <PopularLocations/>
    <br/>
    <FeaturedLocations/>
    <br/>
    <PopularTours/>
    <br/>
    <div>    
      <Header>Next.js with TypeScript and MongoDB</Header>
      <Link href='/posts' className='btn btn-ghost underline'>
        Posts
      </Link> 

      <Link href='/locations' className='btn btn-ghost underline'>
        Locations
      </Link>

      <Link href='/tours' className='btn btn-ghost underline'>
        Tours
      </Link> 
    </div>    
    <Footer/>
          </>
    
  )
}
