import React from 'react';

const timelineEvents = [
  {
    date: 'Q3 2024',
    title: 'Project Initiation',
    description: 'Kickoff meeting, project planning, and initial research.',
  },
  {
    date: 'Q4 2024',
    title: 'Development Phase 1',
    description: 'Start of development, setting up infrastructure, and initial coding.',
  },
  {
    date: 'Q1 2025',
    title: 'Development Phase 2',
    description: 'Continued development, integration of key features, and testing.',
  },
  {
    date: 'Q2 2025',
    title: 'Beta Release',
    description: 'Release of beta version, user testing, and feedback collection.',
  },
  {
    date: 'Q3 2025',
    title: 'Official Launch',
    description: 'Final release, marketing, and onboarding of new users.',
  },
];

const Vision = () => {
  return (
    <section className='overflow-hidden container mx-auto bg-white py-8 sm:py-16'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2'>
          <div className='lg:pr-8 lg:pt-4'>
            <div className='lg:max-w-lg'>
              <h2 className='text-base font-semibold leading-7 text-indigo-600'>Learn to earn</h2>
              <p className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Our Vision</p>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                We've built an API that allows you to scale your podcast production workflow.
              </p>
              <dl className='mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none'>
                {timelineEvents.map((event, index) => (
                  <div key={index} className='relative pl-9'>
                    <dt className='inline font-semibold text-gray-900'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='absolute left-1 top-1 h-5 w-5 text-indigo-600'
                      >
                        <path d='M3.196 12.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 12.87z'></path>
                        <path d='M3.196 8.87l-.825.483a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.758 0l7.25-4.25a.75.75 0 000-1.294l-.825-.484-5.666 3.322a2.25 2.25 0 01-2.276 0L3.196 8.87z'></path>
                        <path d='M10.38 1.103a.75.75 0 00-.76 0l-7.25 4.25a.75.75 0 000 1.294l7.25 4.25a.75.75 0 00.76 0l7.25-4.25a.75.75 0 000-1.294l-7.25-4.25z'></path>
                      </svg>
                      {event.date} - {event.title}
                    </dt>
                    <dd className='inline ml-1'>
                      {event.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className='mt-10 flex items-center gap-x-6'>
              <a
                href='#'
                className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Start for free
              </a>
              <a href='#' className='text-sm font-semibold leading-6 text-gray-700'>
                Schedule a demo
                <span aria-hidden='true'>→</span>
              </a>
            </div>
          </div>
          <img
            src='https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb21wdXRlcnxlbnwwfDB8fHwxNjkxODE2NjY3fDA&ixlib=rb-4.0.3&q=80&w=1080'
            alt='Product screenshot'
            className='w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0'
            width='2432'
            height='1442'
          />
        </div>
      </div>
    </section>
  );
};

export default Vision;
