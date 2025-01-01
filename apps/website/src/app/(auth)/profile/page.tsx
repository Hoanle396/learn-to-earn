'use client';
import { useUser } from '@/apis/auth/queries';
import { useMyCourses } from '@/apis/courses/queries';
import { useCertification } from '@/apis/pool/queries';
import CertificationCard from '@/components/Certification/CertificationCard';
import { IPFS, Storage } from '@/libs/constants';
import { cutString, removeLocalStore } from '@/libs/utils';
import { ArchiveMainBulk, HomeStarBold } from 'icons-next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDisconnect } from 'wagmi';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { push } = useRouter()
  const { disconnect } = useDisconnect()
  const { data } = useUser()
  const { data: courses, refetch } = useMyCourses(undefined)
  const { data: cert } = useCertification()


  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='container mx-auto py-8 pt-20'>
        {/* Main Content */}
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Navigation */}
          <nav className='lg:w-1/4'>
            <div className='bg-white rounded-lg shadow-sm p-4  sticky top-20'>
              <ul className='space-y-4'>
                {['overview', 'courses', 'certification'].map((tab) => (
                  <li key={tab}>
                    <button
                      className={`w-full text-left p-3 rounded-lg transition ${activeTab === tab ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                      onClick={() => handleTabChange(tab)}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  </li>
                ))}
                <li >
                  <button
                    className={`w-full text-left p-3 rounded-lg transition border border-danger text-red-600`}
                    onClick={() => {
                      removeLocalStore(Storage.ACCESS_TOKEN)
                      disconnect()
                      push('/')
                    }}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content Area */}
          <main className='lg:w-3/4'>
            <div className='bg-white rounded-lg shadow-sm p-6'>
              {activeTab === 'overview' && (
                <div className='flex flex-col gap-4 h-[calc(100vh-45rem)]'>
                  <h2 className='text-2xl font-bold mb-4'>Profile Overview</h2>
                  <h4>Hi! {data?.data?.fullname}</h4>
                  <span>Email: {data?.data?.email}</span>
                  <span>Address: {data?.data?.wallet}</span>
                  <span>Status: {data?.data?.isactive ? (<span className='bg-green-300 rounded-md px-2'>Active</span>) : (<span className='bg-red-300 rounded-md px-2'>In Active</span>)}</span>
                </div>
              )}

              {activeTab === 'courses' && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Your courses</h2>
                  <div className='space-y-4 mt-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                      {courses?.data?.items?.map(({ course }: any) => (
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
                  </div>
                </div>
              )}

              {activeTab === 'certification' && (
                <div>
                  <h2 className='text-2xl font-bold mb-4'>Your Certification</h2>
                  <div className='space-y-4 mt-8'>
                    <div className="flex flex-col gap-8">
                      {cert?.data?.items?.map((item: any) => (
                        <CertificationCard key={item.id} data={item} />
                      ))}
                    </div>
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

export default ProfilePage;
