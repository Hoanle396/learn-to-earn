'use client';
import { useMyCourseById } from '@/apis/courses/queries';
import { IPFS } from '@/libs/constants';
import MarkdownPreview from '@uiw/react-markdown-preview';
import dayjs from 'dayjs';
import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const LearningProcess = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview');
  const { push } = useRouter()

  const { data: courses, refetch } = useMyCourseById(String(id))

  const tabs = useMemo(() => courses?.data.course.lessons.map(({ title }: any) => title) ?? [], [courses])
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto py-8 pt-12'>
        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Navigation */}
          <nav className='lg:w-1/4'>
            <div className='bg-white rounded-lg shadow-sm p-4 sticky top-20'>
              <ul className='space-y-4'>
                {['overview', ...tabs].map((tab) => (
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
                  <p className='text-gray-700 mb-6'>{courses?.data.course.name}</p>

                  {/* Video Player */}
                  <div className='aspect-video bg-gray-900 rounded-lg mb-6'>
                    <img
                      className='w-full h-full rounded-lg'
                      src={IPFS(courses?.data.course.logo)}
                      title='Course Introduction'
                    />
                  </div>

                  {/* Course Details */}
                  <div>
                    <h3 className='text-lg font-semibold mb-3'>Course Details</h3>
                    <div className='grid grid-cols-2 space-y-2'>
                      <p className='col-span-2 text-gray-600'>
                        {courses?.data.course.description}
                      </p>
                      <div className='col-span-1 flex gap-2'>
                        <h5 className='font-medium'>Category</h5>
                        <p>{courses?.data.course.category.name}</p>
                      </div>
                      <div className='col-span-1 flex gap-2'>
                        <h5 className='font-medium'>Total Lesson</h5>
                        <p>{courses?.data.course.lessons.length}</p>
                      </div>
                      <div className='col-span-1 flex gap-2'>
                        <h5 className='font-medium'>Created At</h5>
                        <p>{dayjs(courses?.data.course.createdAt).format('DD/MM/YYYY')}</p>
                      </div>
                      <div className='col-span-1 flex gap-2'>
                        <h5 className='font-medium'>Last Update At</h5>
                        <p>{dayjs(courses?.data.course.updatedAt).format('DD/MM/YYYY')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {courses?.data.course.lessons.map((lesson: any) => (<div key={lesson.id}>
                {activeTab == lesson.title && (
                  <div>
                    <h2 className='text-2xl font-bold mb-4'>{lesson.title}</h2>
                    <div className='space-y-4 mt-8'>
                      <div className='aspect-video bg-gray-900 rounded-lg mb-6'>
                        <img
                          className='w-full h-full rounded-lg'
                          src={IPFS(courses?.data.course.logo)}
                          title='Course Introduction'
                        />
                      </div>
                    </div>
                    <MarkdownPreview
                      source={lesson.description}
                      style={{ padding: 16 }}
                    />
                  </div>
                )}
              </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LearningProcess;
