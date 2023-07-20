'use client'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useObject } from 'react-kuh'

import Link from 'next/link'
import Icon from 'bs-icon'
import useFetch, { revalidate } from 'http-react'

import Header from 'components/Header'
import Input from 'components/Input'

function saveTour() {
  revalidate('POST /tours')
}

export default function Create() {
  const router = useRouter()

  const [tour, setTour ] = useObject({
    name : '',
    description : '',
    tag : '',
    imgSource : '',
    slug : ''
  })

  const newTourDate = useMemo(() => Date.now(), [tour])

  const newTour = {
    ...tour,
    date: newTourDate
  }

  // This is not automatic, this is a mutation
  useFetch('/tours', {
    method: 'POST',
    body: { ...newTour, _id: undefined },
    onResolve() {
      router.back()
    }
  })

  return (
    <div>
      <Link href='/tours' className='btn gap-x-2 btn-ghost'>
        <Icon name='arrow-left' className='text-xl' /> Back
      </Link>
      <Header>Add Tours</Header>
      <div className='flex flex-wrap w-full md:w-96 items-center justify-center space-y-2'>
        <div className='w-full'>
          <Input
            value={tour.name}
            name='name'
            onChange={e =>
              setTour.write({
                name : e.target.value
              })
            }
            placeholder='Tour Name'
          />
        </div>
        <div className='w-full'>
          <textarea
            placeholder='Description'
            className='textarea textarea-bordered h-32 resize-none w-full'
            name='description'
            onChange={e =>
              setTour.write({
                description: e.target.value
              })
            }
          ></textarea>
        </div>
        <div className='w-full'>
          <Input
            value={tour.tag}
            name='tag'
            onChange={e =>
              setTour.write({
                tag : e.target.value
              })
            }
            placeholder='Tour Tag'
          />
        </div>
        <div className='w-full'>
          <Input
            value = {tour.imgSource}
            name='imgSource'
            onChange={e =>
              setTour.write({
                imgSource: e.target.value
              })
            }
            placeholder='Source of Tour Image'

          />
        </div>

        <div className='w-full'>
          <Input
            value = {tour.slug}
            name='slug'
            onChange={e =>
              setTour.write({
                slug: e.target.value
              })
            }
            placeholder='slug'
          />
        </div>

        <div className='w-full text-center'>
          <button onClick={saveTour} className='btn gap-x-2'>
            <span>Save</span>
            <Icon name='disc' className='text-xl' />
          </button>
        </div>
      </div>
    </div>
  )
}
