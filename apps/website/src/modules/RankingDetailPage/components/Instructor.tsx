import { usePoolById } from '@/apis/pool/queries';
import { IPFS } from '@/libs/constants';
import { useParams } from 'next/navigation';
import { FaForward } from 'react-icons/fa';

const Instructor = () => {
  const { id } = useParams();
  const { data } = usePoolById(Number(id));
  return (
    <div className='single_instructor'>
      <div className='single_instructor_thumb'>
        <a href='#'>
          <img src={IPFS(data?.data?.logo)} className='img-fluid' alt='' />
        </a>
      </div>
      <div className='single_instructor_caption'>
        <h4>
          <a href='#'>Jonathan Campbell</a>
        </h4>
        <ul className='instructor_info flex'>
          <li className='flex gap-1 items-center flex-row'>
            <FaForward />
            {data?.data?.startTime?.slice(0, 10)}
          </li>
          <li className='flex gap-1 items-center flex-row'>
            <FaForward />
            {data?.data?.endTime?.slice(0, 10)}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructor;
