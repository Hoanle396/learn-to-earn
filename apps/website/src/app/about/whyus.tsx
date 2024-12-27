import React from 'react';

const WhyUs = () => {
  return (
    <section className='container mx-auto bg-white py-8 sm:py-16'>
      <div className='py-12 bg-white'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='lg:text-center'>
            <h2 className='font-heading mb-4 bg-orange-100 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-lg font-semibold tracking-widest text-primary uppercase title-font'>
              Why choose us?
            </h2>
            <p className='font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl'>
              Learn and Earn Certification System
            </p>
            <p className='mt-4 max-w-2xl text-lg text-gray-500 lg:mx-auto'>
              Our platform provides a comprehensive system for learning and earning certifications. We offer a variety of courses and assessments to help you achieve your goals.
            </p>
          </div>

          <div className='mt-20'>
            <dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
              <div className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white'>
                    <img src='https://www.svgrepo.com/show/503163/api-settings.svg' alt="API Icon" />
                  </div>
                  <p className='font-heading ml-16 text-lg leading-6 font-bold text-gray-700'>Comprehensive Courses</p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  Our platform offers a wide range of courses covering various topics to help you gain the knowledge you need.
                </dd>
              </div>
              <div className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white'>
                    <img src='https://www.svgrepo.com/show/503138/webpack.svg' alt="SDK Icon" />
                  </div>
                  <p className='font-heading ml-16 text-lg leading-6 font-bold text-gray-700'>Easy to Use Interface</p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  Our user-friendly interface makes it easy to navigate through courses and assessments.
                </dd>
              </div>
              <div className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white'>
                    <img src='https://www.svgrepo.com/show/511771/dashboard-671.svg' alt="Dashboard Icon" />
                  </div>
                  <p className='font-heading ml-16 text-lg leading-6 font-bold text-gray-700'>Affordable Pricing</p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  We offer competitive pricing for our courses and certifications, making it accessible for everyone.
                </dd>
              </div>
              <div className='relative'>
                <dt>
                  <div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white'>
                    <img src='https://www.svgrepo.com/show/76267/free-commercial-label.svg' alt="Free Label Icon" />
                  </div>
                  <p className='font-heading ml-16 text-lg leading-6 font-bold text-gray-700'>Real-time Progress Tracking</p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  Track your progress in real-time and stay motivated to achieve your certification goals.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
