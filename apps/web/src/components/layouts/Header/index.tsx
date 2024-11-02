import { Icons } from '@/assets/icons'
import useToggle from '@/hooks/useToggle'
import { cn } from '@/libs/utils'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  const [toggle, onToggle,] = useToggle()

  const handleToggle = () => {
    onToggle()
  }

  return (
    <header className='flex border-b py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
      <div className='flex flex-wrap items-center gap-5 w-full'>
        <Link href="/">
          <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
        </Link>

        <div
          className={cn({
            'max-lg:hidden lg:!block max-lg:w-full max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50': true,
            '!block': toggle,
            '!none': !toggle
          })}>


          <ul
            className='lg:flex lg:ml-14 lg:gap-x-5 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 relative'>
            <button onClick={handleToggle} className='top-4 lg:hidden absolute right-4 z-[100]'>
              <Icons.close className='w-4 h-4' />
            </button>
            <li className='mb-6 hidden max-lg:block'>
              <Link href="/">
                <img src="https://readymadeui.com/readymadeui.svg" alt="logo" className='w-36' />
              </Link>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'>
              <Link href="/"
                className='lg:hover:text-[#007bff] text-[#007bff] block font-semibold text-[15px]'>Home</Link>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'><Link href="/"
              className='lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Team</Link>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'><Link href="/"
              className='lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Feature</Link>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'><Link href="/"
              className='lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>Blog</Link>
            </li>
            <li className='max-lg:border-b max-lg:py-3 px-3'><Link href="/"
              className='lg:hover:text-[#007bff] text-gray-500 block font-semibold text-[15px]'>About</Link>
            </li>
          </ul>
        </div>

        <button onClick={handleToggle} className='lg:hidden ml-auto'>
          <Icons.menu className='w-6 h-6' />
        </button>

        <div className='flex lg:ml-auto max-lg:w-full'>
          <div
            className='flex xl:w-80 max-xl:w-full bg-gray-100 px-6 py-3 rounded outline outline-transparent focus-within:outline-[#007bff] focus-within:bg-transparent'>
            <input type='text' placeholder='Search something...'
              className='w-full text-sm bg-transparent rounded outline-none pr-2' />
            <Icons.search />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
