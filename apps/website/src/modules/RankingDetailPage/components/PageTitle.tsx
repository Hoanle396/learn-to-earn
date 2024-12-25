import { usePoolById } from '@/apis/pool/queries';
import { useParams } from 'next/navigation';
import React from 'react';
import { FaCalendar, FaForward, FaStar, FaStarHalfAlt, FaUser } from 'react-icons/fa';

const PageTitle = () => {
  const { id } = useParams();
  const { data } = usePoolById(Number(id));
  return (
    <div className='ed_detail_head'>
      <div className='container mx-auto'>
        <div className='grid items-center grid-cols-12'>
          <div className='lg:col-span-8 col-span-7'>
            <div className='ed_detail_wrap gap-1 h-fit w-fit'>
              <div className='flex gap-1'>
                {data?.data?.tags.map((tag: string) => (
                  <div key={tag} className='bg-primary/30 rounded-full w-fit p-2'>
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
              <div className='ed_header_caption'>
                <h2 className='text-xl font-medium'>{data?.data?.name ?? ''}</h2>
                <div className='flex gap-3 mt-8'>
                  <p className='flex gap-1 items-center'>
                    <FaCalendar />
                    <p> 10 - 20 weeks</p>
                  </p>
                  <p className='flex gap-1 items-center'>
                    <FaUser />
                    502 Student Enrolled
                  </p>
                </div>
              </div>
              <div className='ed_header_short'>
                <p>
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                  laborum. accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore.
                  veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
