import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

import manSeeBird from '../../../../../public/man-see-bird.jpg';

export default function Page() {
  return (
    <div className='flex md:flex-row flex-col md:justify-between justify-center items-center'>
      <div className='hidden md:block w-1/2 h-screen overflow-hidden object-cover'>
        <Image className='w-[100%] h-screen' src={manSeeBird} alt='Homem olhando para o pássaro.' />
      </div>
      <div className='w-1/2 h-screen flex items-center justify-center'>
        <SignIn />
      </div>
    </div>
  )
}