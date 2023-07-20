import Validate from 'next-api-validation'
import { NextResponse } from 'next/server'
import { Location, ILocation } from 'src/Models'
import { connectToDatabase } from 'src/utils'

connectToDatabase()

export async function GET() {
  try {
    const locations = await Location.find()
    return NextResponse.json(locations.reverse())
  } catch {
    return NextResponse.json('error', {
      status: 500
    })
  }
}

export async function POST(req: Request) {
  try {
    const body: ILocation = await req.json()
    const newLocation = new Location(body)
    const saved = await newLocation.save()
    return NextResponse.json(saved)
  } catch {
    return NextResponse.json('error', {
      status: 500
    })
  }
}

export async function DELETE(req: Request) {
  const query = new URL(req.url).searchParams
  const id = query.get('id')
  try {
    const deletedLocation = await Location.findByIdAndDelete(id)

    return NextResponse.json(deletedLocation)
  } catch {
    return NextResponse.json(
      {
        error: 'Failed to remove location'
      },
      {
        status: 500
      }
    )
  }
}

