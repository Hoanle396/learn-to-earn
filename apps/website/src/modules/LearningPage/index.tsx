'use client';
import { useCategories } from '@/apis/categories/queries';
import { useCourses } from '@/apis/courses/queries';
import { IPFS } from '@/libs/constants';
import { AddMainBulk, ArchiveMainBulk, HomeStarBold, FlashCircleBulk } from 'icons-next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const LearningPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [courses, setCourses] = useState<any>([]);

  const { data } = useCourses(undefined)
  const { data: categories } = useCategories()

  useEffect(() => {
    if (data) {
      setCourses(data.data.items)
    }
  }, [data])



  const toggleBookmark = (courseId: number) => {
    // @ts-expect-error ignore
    setBookmarkedItems((prev) =>
      prev.includes(courseId as never) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const filteredCourses = courses.filter(
    (course: any) =>
      (selectedFilter === '' || course.category.id == selectedFilter) &&
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='bg-white container mx-auto'>
      <div>
        <main className='mx-auto'>
          <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900'>New Arrivals</h1>

            <div className='flex flex-wrap gap-4 items-center justify-between'>
              <div className='relative flex-1 min-w-[300px]'>
                <FiSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' />
                <input
                  type='text'
                  placeholder='Search courses...'
                  className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className='flex gap-4'>
                <select
                  className='px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                >
                  {categories?.data?.items?.map((category: any) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))
                  }
                </select>
                <button className='flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'>
                  <FlashCircleBulk className='w-6 h-6' color='origen' />
                  Filters
                </button>
              </div>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pb-24 pt-6'>
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
              <div className='hidden lg:block lg:col-span-1'>
                <h3 className='sr-only'>Categories</h3>
                <ul role='list' className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900'>
                  {categories?.data?.items?.map((category: any) => (<li key={category.id}>
                    <a href='#'>{category.name}</a>
                  </li>))}
                </ul>
              </div>
              <div className='lg:col-span-4'>
                <div className='min-h-screen bg-gray-50 p-8'>
                  <div className='max-w-7xl mx-auto'>
                    {/* Course Grid */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                      {filteredCourses.map((course: any) => (
                        <div
                          key={course.id}
                          className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow flex-col relative h-[26rem]'
                        >
                          <div className='relative h-48 w-full flex top-0'>
                            <Image
                              fill
                              src={IPFS(course.logo)}
                              alt={course.name}
                              className='w-full h-full object-cover rounded-xl absolute top-0 left-0 right-0'
                            />
                            <button
                              onClick={() => toggleBookmark(course.id)}
                              className='absolute top-4 right-4 p-2'
                            >
                              <AddMainBulk
                                className='w-6 h-6'
                                color={bookmarkedItems.includes(course.id as never) ? 'blue' : 'gray'}
                              />
                            </button>
                          </div>
                          <div className='p-6 flex flex-col justify-between'>
                            <div className='flex items-center justify-between mb-2'>
                              <div className='flex items-center gap-1'>
                                <HomeStarBold className='w-4 h-4' color='yellow' />
                                <span className='text-sm text-gray-600'>4.5</span>
                              </div>
                            </div>
                            <h3 className='text-xl font-semibold text-gray-900 mb-2'>{course.name}</h3>
                            <p className='text-gray-600 mb-4'>{course.description?.slice(0, 100)}</p>
                          </div>
                          <div className='p-4 absolute bottom-0 w-full'>
                            <Link href={`/learn/${course.id}`}>
                              <button className='w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors'>
                                <ArchiveMainBulk className='w-4 h-4 text-white' />
                                Continue Learning
                              </button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Quiz Section */}
                    <div className='mt-12 bg-white rounded-xl shadow-md p-8'>
                      <h2 className='text-2xl font-bold text-gray-900 mb-6'>Quick Assessment</h2>
                      <div className='space-y-6'>
                        <div className='p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors'>
                          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                            What is the main purpose of HTML?
                          </h3>
                          <div className='space-y-3'>
                            {['Structure', 'Styling', 'Interactivity', 'Database'].map((option, index) => (
                              <label
                                key={index}
                                className='flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer'
                              >
                                <input type='radio' name='question1' className='form-radio text-blue-500' />
                                <span className='text-gray-700'>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default LearningPage;
