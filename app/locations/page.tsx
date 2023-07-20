'use client'
import Link from 'next/link'
import useFetch, { revalidate } from 'http-react'
import Icon from 'bs-icon'

import { ILocation } from 'src/Models/Location'
import Header from 'components/Header'

function confirmLocationDelete(id: any) {
  const confirmation = confirm('Do you want to remove this Location ?')
  if (confirmation) {
    revalidate(id)
  }
  
}

function Location(props: Partial<ILocation>) {
  const fetchID = {
    location : props
  }

  useFetch('/locations', {
    id: fetchID,
    method: 'DELETE',
    query: {
      id: props._id
    },
    onResolve() {
      revalidate('GET /locations')
    }
  })

  return (
    <div
      style={{
        transition: '0.12s'
      }}
      className='card p-4 relative break-words rounded-lg hover:border-neutral-400 card-bordered m-4'
      key={`location-${props._id}`}
    >
      <button
        className='btn btn-ghost font-semibold absolute top-1 right-1 cursor-pointer'
        onClick={() => confirmLocationDelete(fetchID)}
      >
        <Icon name='trash' className='text-xl' />
      </button>
      <b className='my-2'>{props.name}</b>
      <br />
      <p className='my-4'>{props.description}</p>
      <br />
      <p className='my-4'>{props.tag}</p>
      <br />
      <b className='my-2'>{props.imgSource}</b>
      <br />
    </div>
  )
}

export default function Locations() {
  const { data, loadingFirst, error } = useFetch<ILocation []>('/locations', {
    default: []
  })

  if (loadingFirst)
    return <p className='text-2xl font-semibold py-4'>Loading Locations ...</p>

  if (error)
  {
    console.log(error)
    return <p className='text-2xl text-red-400 py-4'>Failed to fetch locations</p>
  }

  return (
    <div>
      <Header>Your Locations ({data.length})</Header>
      <div className='flex space-x-4'>
        <Link href='/' className='btn gap-x-2 btn-ghost'>
          <Icon name='arrow-left' className='text-xl' /> Back
        </Link>
        <Link href='/locations/create' className='btn gap-x-2'>
          Add one Location <Icon name='plus' className='text-xl' />
        </Link>
      </div>
      <div className='py-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 rounded-md'>
        {data.map(location => (
          <Location {...location} key={`location-${location._id}`} />
        ))}
      </div>
    </div>
  )
}
