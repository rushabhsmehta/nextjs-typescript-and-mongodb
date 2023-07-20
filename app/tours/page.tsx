'use client'
import Link from 'next/link'
import useFetch, { revalidate } from 'http-react'
import Icon from 'bs-icon'

import { ITour } from 'src/Models/Tour'
import Header from 'components/Header'

function confirmTourDelete(id: any) {
  const confirmation = confirm('Do you want to remove this Tour ?')
  if (confirmation) {
    revalidate(id)
  }

}

function Tour(props: Partial<ITour>) {
  const fetchID = {
    tour : props
  }

  useFetch('/tours', {
    id: fetchID,
    method: 'DELETE',
    query: {
      id: props._id
    },
    onResolve() {
      revalidate('GET /tours')
    }
  })

  return (
    <div
      style={{
        transition: '0.12s'
      }}
      className='card p-4 relative break-words rounded-lg hover:border-neutral-400 card-bordered m-4'
      key={`tour-${props._id}`}
    >
      <button
        className='btn btn-ghost font-semibold absolute top-1 right-1 cursor-pointer'
        onClick={() => confirmTourDelete(fetchID)}
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
      <b className='my-2'>{props.slug}</b>
      <br />
    </div>
  )
}

export default function Tours() {
  const { data, loadingFirst, error } = useFetch<ITour []>('/tours', {
    default: []
  })

  if (loadingFirst)
    return <p className='text-2xl font-semibold py-4'>Loading Tours ...</p>

  if (error)
  {
    console.log(error)
    return <p className='text-2xl text-red-400 py-4'>Failed to fetch Tours</p>
  }

  return (
    <div>
      <Header>Your Tours ({data.length})</Header>
      <div className='flex space-x-4'>
        <Link href='/' className='btn gap-x-2 btn-ghost'>
          <Icon name='arrow-left' className='text-xl' /> Back
        </Link>
        <Link href='/tours/create' className='btn gap-x-2'>
          Add one Tour <Icon name='plus' className='text-xl' />
        </Link>
      </div>
      <div className='py-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 rounded-md'>
        {data.map(tour => (
          <Tour {...tour} key={`tour-${tour._id}`} />
        ))}
      </div>
    </div>
  )
}
