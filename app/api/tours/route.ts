import Validate from 'next-api-validation'
import { NextResponse } from 'next/server'
import { Tour, ITour } from 'src/Models'
import { connectToDatabase } from 'src/utils'

connectToDatabase()

export async function GET() {
  try {
    const tours = await Tour.find()
    return NextResponse.json(tours.reverse())
  } catch {
    return NextResponse.json('error', {
      status: 500
    })
  }
}

export async function POST(req: Request) {
  try {
    const body: ITour = await req.json()
    const newTour = new Tour(body)
    const saved = await newTour.save()
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
    const deletedTour = await Tour.findByIdAndDelete(id)

    return NextResponse.json(deletedTour)
  } catch {
    return NextResponse.json(
      {
        error: 'Failed to remove Tour'
      },
      {
        status: 500
      }
    )
  }
}
