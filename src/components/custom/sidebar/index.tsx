import Link from 'next/link';
import BreadcrumbCustom from '../breadcrumb';
import React from 'react';

export default function SideBar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex'>
      <div className='flex flex-col w-auto h-screen p-6 items-center gap-8 bg-[#09090B] border-r border-[#27272A]'>
        <Link href='/'>
          <button className='size-10 p-4 rounded-full bg-blue-500 text-white'></button>
        </Link>
        <Link href='/pages/dashboard'>
          <button className='size-10 p-4 rounded-full bg-blue-500 text-white'></button>
        </Link>
        <Link href='pages/'>
          <button className='size-10 p-4 rounded-full bg-blue-500 text-white'></button>
        </Link>
      </div>

      <div className='w-full'>
        <div className='flex w-full h-20 bg-[#151518] text-white items-center border-b border-solid border-[#27272A]'>
          <BreadcrumbCustom />
        </div>
        <div className='flex w-full h-20 bg-[#151518] text-white items-center border-b border-solid border-[#27272A]'>
          Teste
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
