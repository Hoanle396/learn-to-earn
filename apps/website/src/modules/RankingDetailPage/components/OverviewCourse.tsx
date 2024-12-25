import { usePoolById } from '@/apis/pool/queries';
import { useParams } from 'next/navigation';
import React from 'react';

const OverviewCourse = () => {
  const { id } = useParams();
  const { data } = usePoolById(Number(id));
  return (
    <>
      <div className='edu_wraper'>
        <h4 className='edu_title text-lg font-medium'>Test Overview</h4>
        <p>{data?.data?.description}</p>
      </div>
    </>
  );
};

export default OverviewCourse;
