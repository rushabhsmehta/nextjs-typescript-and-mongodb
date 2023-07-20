'use client'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useObject } from 'react-kuh'

import Link from 'next/link'
import Icon from 'bs-icon'
import useFetch, { revalidate } from 'http-react'

import Header from 'components/Header'
import Input from 'components/Input'

function saveLocation() {
  revalidate('POST /locations')
}

export default function Create() {
  const router = useRouter()

  const [location, setLocation] = useObject({
    name : '',
    description : '',
    tag : '',
    imgSource : ''
  })

  const newLocationDate = useMemo(() => Date.now(), [location])

  const newLocation = {
    ...location,
    date: newLocationDate
  }

  // This is not automatic, this is a mutation
  useFetch('/locations', {
    method: 'POST',
    body: { ...newLocation, _id: undefined },
    onResolve() {
      router.back()
    }
  })

  return (
    <div>
      <Link href='/locations' className='btn gap-x-2 btn-ghost'>
        <Icon name='arrow-left' className='text-xl' /> Back
      </Link>
      <Header>Add Locations</Header>
      <div className='flex flex-wrap w-full md:w-96 items-center justify-center space-y-2'>
        <div className='w-full'>
          <Input
            value={location.name}
            name='name'
            onChange={e =>
              setLocation.write({
                name : e.target.value
              })
            }
            placeholder='Location Name'
          />
        </div>
        <div className='w-full'>
          <textarea
            placeholder='Description'
            className='textarea textarea-bordered h-32 resize-none w-full'
            name='description'
            onChange={e =>
              setLocation.write({
                description: e.target.value
              })
            }
          ></textarea>
        </div>
        <div className='w-full'>
          <Input
            value={location.tag}
            name='tag'
            onChange={e =>
              setLocation.write({
                tag : e.target.value
              })
            }
            placeholder='Location Tag'
          />
        </div>
        <div className='w-full'>
          <Input
            value = {location.imgSource}
            name='imgSource'
            onChange={e =>
              setLocation.write({
                imgSource: e.target.value
              })
            }
            placeholder='Source of Location Image'

          />
        </div>

        <div className='w-full text-center'>
          <button onClick={saveLocation} className='btn gap-x-2'>
            <span>Save</span>
            <Icon name='disc' className='text-xl' />
          </button>
        </div>
      </div>
    </div>
  )
}
