'use client';
import { usePoolActive } from '@/apis/pool/queries';
import { IPFS } from '@/libs/constants';
import Link from 'next/link';
import React, { useState } from 'react';

type Course = {
  id: number;
  name: string;
  level: string;
  category: string;
  description: string;
  imageUrl: string;
  price: number;
};

const RankingPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tags, setTags] = useState('');
  const { data } = usePoolActive({});

  const filteredCourses =
    data?.data?.items?.filter((item: any) => {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase()) && (tags ? item.tags.includes(tags) : true);
    }) ?? [];

  return (
    <div className='min-h-screen bg-gray-50 p-8 mt-12'>
      <div className='mx-auto container'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-primary mb-4'>Prove Your Expertise, Earn Your Certification</h1>
          <p className='text-xl text-gray-700'>Get certified today and unlock new opportunities</p>
        </div>
        <div className='flex flex-wrap justify-end gap-4 mb-8'>
          <input
            type='text'
            placeholder='Search courses...'
            className='p-2 border rounded-lg w-full md:w-64'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select value={tags} onChange={(e) => setTags(e.target.value)} className='p-2 border rounded-lg'>
            <option value=''>All Tags</option>
            {['English', 'Arabic', 'French', 'German', 'Portuguese'].map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredCourses.map((course: any) => (
            <Link href={`/ranking/${course.id}`} key={course.id}>
              <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'>
                <img src={IPFS(course.logo)} alt={course.name} className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h2 className='text-xl font-semibold mb-2'>{course.name}</h2>
                  <p className='text-gray-600 mb-4'>{course.description.slice(0, 100)}..</p>
                  <div className='flex justify-between items-center'>
                    <div className='flex gap-1'>
                      {course.tags.map((tag: string, index: number) => (
                        <span key={index} className='bg-green-100 text-green-800 px-2 py-1 rounded text-sm'>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
