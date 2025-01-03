import Link from 'next/link';
import React from 'react';

const NotFound = () => {
  return (
    <div className='flex items-center justify-center min-h-screen  bg-fixed bg-cover bg-bottom error-bg' style={{}}>
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 offset-sm-2 text-primary text-center -mt-52'>
            <div className='relative '>
              <h1 className='relative text-9xl tracking-tighter-less text-shadow font-sans font-bold'>
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
              <span className='absolute top-0 -ml-12 text-secondary font-semibold'>Oops!</span>
            </div>
            <h5 className='text-muted-blue font-semibold -mr-10 -mt-3'>Page not found</h5>
            <p className='text-monsoon mt-2 mb-6'>we are sorry, but the page you requested was not found</p>
            <Link
              href='/'
              className='bg-green-400 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg'
            >
              Got to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
