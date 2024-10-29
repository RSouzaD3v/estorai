import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'

import princesaRei from '../../../../../public/princesa-e-rei.jpg';

export default function Page() {
  return (
    <div className='flex md:flex-row flex-col md:justify-between justify-center items-center'>
      <div className='w-1/2 h-screen flex items-center justify-center'>
        <SignUp />
      </div>
      <div className='hidden md:block w-1/2 h-screen overflow-hidden object-cover'>
        <Image className='w-[100%] h-screen' src={princesaRei} alt='Homem olhando para o pássaro.' />
      </div>
    </div>
  )
}