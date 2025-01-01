'use client';
import { useCourseById, useMyCourseById, useSubscribe } from '@/apis/courses/queries';
import { IPFS } from '@/libs/constants';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaBookmark, FaShareAlt, FaStar, FaUser } from 'react-icons/fa';

const LearningDetailPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { mutateAsync } = useSubscribe()

  const { id } = useParams()

  const { data } = useCourseById(String(id))
  const { data: course, refetch } = useMyCourseById(String(id))

  console.log(data, course);

  const dummyData = {
    reviews: [
      { user: 'John D.', rating: 5, comment: 'Excellent course content!' },
      {
        user: 'Maria S.',
        rating: 4,
        comment: 'Very informative and well-structured.',
      },
    ],
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleSubscribe = async () => {
    try {
      await mutateAsync(String(id))
      refetch()
      toast.success("Subscribed successfully. You can now access the course.");
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  }


  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto py-8 pt-12'>
        {/* Header Section */}
        <header className='mb-8'>
          <div className='flex items-center justify-between mb-6'>
            <h1 className='text-3xl font-bold text-gray-800'>{data?.data.name}</h1>
            <div className='flex items-center space-x-4'>
              <button
                className='p-2 rounded-full hover:bg-gray-200'
                aria-label='Share course'
                onClick={() => console.log('Share clicked')}
              >
                <FaShareAlt className='text-gray-600' />
              </button>
              <button
                className='p-2 rounded-full hover:bg-gray-200'
                aria-label='Bookmark course'
                onClick={() => console.log('Bookmark clicked')}
              >
                <FaBookmark className='text-gray-600' />
              </button>
            </div>
          </div>

        </header>

        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Navigation */}
          <nav className='lg:w-1/4'>
            <div className='bg-white rounded-lg shadow-sm p-4'>
              <ul className='space-y-2'>
                {['overview', 'lessons', 'reviews'].map((tab) => (
                  <li key={tab}>
                    <button
                      className={`w-full text-left p-3 rounded-lg transition ${activeTab === tab ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className='lg:w-3/4'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              {activeTab === 'overview' && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Course Overview</h2>
                  <p className='text-gray-700 mb-6'>{data?.data.name}</p>

                  {/* Video Player */}
                  <div className='aspect-video bg-gray-900 rounded-lg mb-6'>
                    <img
                      className='w-full h-full rounded-lg'
                      src={IPFS(data?.data.logo)}
                      title='Course Introduction'
                    />
                  </div>

                  {/* Course Details */}
                  <div>
                    <h3 className='text-lg font-semibold mb-3'>Course Details</h3>
                    <div className='grid grid-cols-2 space-y-2'>
                      <p className='col-span-2 text-gray-600'>
                        {data?.data.description}
                      </p>
                      <div className='col-span-1 flex gap-2'>
                        <h5 className='font-medium'>Category</h5>
                        <p>{data?.data.category.name}</p>
                      </div>
                      <div className='col-span-1 flex gap-2'>
                        <h5 className='font-medium'>Total Lesson</h5>
                        <p>{data?.data.lessons.length}</p>
                      </div>
                      <div className='col-span-1 flex gap-2'>
                        <h5 className='font-medium'>Created At</h5>
                        <p>{dayjs(data?.data.createdAt).format('DD/MM/YYYY')}</p>
                      </div>
                      <div className='col-span-1 flex gap-2'>
                        <h5 className='font-medium'>Last Update At</h5>
                        <p>{dayjs(data?.data.updatedAt).format('DD/MM/YYYY')}</p>
                      </div>
                    </div>
                  </div>

                  {/* File Upload */}
                  {course ? (
                    <div className='mt-6'>
                      <div className='rounded-lg p-6 text-center'>
                        <Link href={`/learn/${id}/learn`} >
                          <button className='hover:bg-primary/80 h-16 w-full rounded-xl bg-primary py-2 text-[18px] font-medium text-white transition-all duration-200 ease-in-out sm:text-[28px] xl:w-[564px]'>
                            Learn now
                          </button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className='mt-6'>
                      <div className='rounded-lg p-6 text-center'>
                        <button onClick={handleSubscribe} className='hover:bg-primary/80 h-16 w-full rounded-xl bg-primary py-2 text-[18px] font-medium text-white transition-all duration-200 ease-in-out sm:text-[28px] xl:w-[564px]'>
                          Subscribe this course
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'lessons' && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Lessons of the course</h2>
                  <div className='space-y-4'>
                    {data.data.lessons.map((item: any, index: number) => (
                      <div key={index} className='border rounded-lg p-4 hover:bg-gray-50 transition'>
                        <div className='flex justify-between items-center'>
                          <h3 className='font-semibold'>{item.title}</h3>
                          <span className='text-gray-600 text-sm'>{item.index}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Student Reviews</h2>
                  <div className='space-y-4'>
                    {dummyData.reviews.map((review, index) => (
                      <div key={index} className='border rounded-lg p-4'>
                        <div className='flex items-center mb-2'>
                          <FaUser className='text-gray-400 mr-2' />
                          <span className='font-semibold'>{review.user}</span>
                        </div>
                        <div className='flex items-center mb-2'>
                          {[...Array(review.rating)].map((_, i) => (
                            <FaStar key={i} className='text-yellow-500' />
                          ))}
                        </div>
                        <p className='text-gray-700'>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LearningDetailPage;
