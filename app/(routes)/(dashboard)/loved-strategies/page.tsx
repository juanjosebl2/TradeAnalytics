import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { ListLovedStrategies } from './ListLovedStrategies'

export default function pageLovedStrategies() {
  const { userId } = auth()
  if (!userId) {
    return redirect('/')
  } 

  return (
    <div>
        <h1 className='mb-4 text-2xl font-bold'>Estrategias que te gustan</h1>
        <ListLovedStrategies />
    </div>
  )
}