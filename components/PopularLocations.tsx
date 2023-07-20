import React from 'react'
import { ILocation } from 'src/Models/Location'
import useFetch from 'http-react'


function Location(props: Partial<ILocation>) {
  return (
    <a href={`${props.slug}`} rel="noopener noreferrer">
      <div className="card p-1 relative break-words rounded-lg hover:border-neutral-400 card-bordered" style={{ transition: '0.12s' }}>
        <img src={props.imgSource} height={300} width={300} className = "rounded-md" />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center">
          <b className="my-2 text-white text-xl">{props.name}</b>
          <p className="my-4 text-white">{props.description}</p>
        </div>
      </div>
    </a>
  );
}

export default function PopularLocations() {

    const { data, loadingFirst, error } = useFetch<ILocation[]>('/locations', {
        default: [],
      })
    
    const filteredLocations = data.filter(location => location.tag && location.tag.includes('popular'));

  return (

<div className='py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 rounded-md' style={{ overflowX: 'auto' }}>
    <div
      style={{
        transition: '0.12s',
        background: 'linear-gradient(to bottom right, #000000, #ffff00)'
      }}
      className='card p-2 relative break-words rounded-lg hover:border-neutral-400 card-bordered m-4 flex justify-center items-center'
    >
      <p className='text-white text-2xl font-bold' style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>
        Popular Locations
      </p>
    </div>
  
    {filteredLocations.map(location => (
        <Location {...location} key={`location-${location._id}`} />
      ))}
  </div>
    )
}
