import { FaCheck, FaFile, FaGamepad, FaTag, FaUser } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';

const Sidebar = () => {
  return (
    <div className='col-lg-4 col-md-12 order-lg-last'>
      <div className='ed_view_box style_2 stick_top'>
        <div className='ed_author'>
          <h2 className='theme-cl m-0'>
            $149.00<span className='old_prc'>$299.00</span>
          </h2>
        </div>
        <div className='ed_view_features'>
          <div className='eld mb-3'>
            <h5 className='font-medium'>This Course Include:</h5>
            <p>
              Aaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
              sunt explicabo.
            </p>
          </div>
          <div className='eld mb-3'>
            <ul className='edu_list right'>
              <li className='flex gap-1 items-center'>
                <FaUser />
                Student Enrolled:<strong>1740</strong>
              </li>
              <li className='flex gap-1 items-center'>
                <FaFile />
                Topic:<strong>PHP Script</strong>
              </li>
              <li className='flex gap-1 items-center'>
                <FaGamepad />
                Quizzes:<strong>4</strong>
              </li>
              <li className='flex gap-1 items-center'>
                <IoTime />
                Class:<strong>32 Lectures</strong>
              </li>
              <li className='flex gap-1 items-center'>
                <FaTag />
                Skill Level:<strong>Beginner</strong>
              </li>
            </ul>
          </div>
          <div className='eld mb-3'>
            <h5 className='font-medium'>Others Include:</h5>
            <ul>
              <li className='flex gap-1 items-center'>
                <FaCheck />
                Full lifetime access
              </li>
              <li className='flex gap-1 items-center'>
                <FaCheck />
                20+ downloadable resources
              </li>
              <li className='flex gap-1 items-center'>
                <FaCheck />
                Certificate of completion
              </li>
              <li className='flex gap-1 items-center'>
                <FaCheck />
                Free Trial 7 Days
              </li>
            </ul>
          </div>
        </div>
        <div className='ed_view_link'>
          <a href='#' className='btn theme-light enroll-btn'>
            Get Membership
            <i className='ti-angle-right' />
          </a>
          <a href='#' className='btn theme-bg enroll-btn'>
            Enroll Now
            <i className='ti-angle-right' />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
