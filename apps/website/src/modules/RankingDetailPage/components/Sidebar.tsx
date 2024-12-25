import { usePoolById } from '@/apis/pool/queries';
import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FaFile, FaGamepad, FaTag, FaUser } from 'react-icons/fa';
import { useAccount } from 'wagmi';

const Sidebar = () => {
  const { address } = useAccount();
  const { auth } = useAuthStore();
  const { id } = useParams();
  const { data } = usePoolById(Number(id));
  return (
    <div className='col-lg-4 col-md-12 order-lg-last'>
      <div className='ed_view_box style_2 stick_top'>
        <div className='ed_view_features'>
          <div className='eld mb-3'>
            <ul className='edu_list right'>
              <li className='flex gap-1 items-center'>
                <FaUser />
                Student Enrolled:<strong></strong>
              </li>
              <li className='flex gap-1 items-center'>
                <FaFile />
                Topic: {data?.data?.tags.join(', ')}
              </li>
              <li className='flex gap-1 items-center'>
                <FaGamepad />
                Quizzes:<b>{data?.data?.quizzes.length}</b>
              </li>
              <li className='flex gap-1 items-center'>
                <FaTag />
                question to pass:<strong>{data?.data?.questionPerPool}</strong>
              </li>
            </ul>
          </div>
        </div>
        <div className='ed_view_link'>
          {address ? (
            <Link href={`/ranking/${id}/test`} className='btn theme-light enroll-btn'>
              Test now
              <i className='ti-angle-right' />
            </Link>
          ) : (
            <Link href='/login' className='btn theme-light enroll-btn'>
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
