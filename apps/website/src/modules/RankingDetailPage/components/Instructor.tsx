import React from 'react';
import { FaCamera, FaFacebook, FaForward, FaLinkedin, FaTelegram, FaTwitter, FaUser } from 'react-icons/fa';

const Instructor = () => {
  return (
    <div className='single_instructor'>
      <div className='single_instructor_thumb'>
        <a href='#'>
          <img src='https://via.placeholder.com/500x500' className='img-fluid' alt='' />
        </a>
      </div>
      <div className='single_instructor_caption'>
        <h4>
          <a href='#'>Jonathan Campbell</a>
        </h4>
        <ul className='instructor_info flex'>
          <li className='flex gap-1 items-center flex-row'>
            <FaCamera />
            72 Videos
          </li>
          <li className='flex gap-1 items-center flex-row'>
            <FaForward />
            102 Lectures
          </li>
          <li className='flex gap-1 items-center flex-row'>
            <FaUser />
            Exp. 4 Year
          </li>
        </ul>
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
          voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi.
        </p>
        <ul className='social_info'>
          <li>
            <a href='#'>
              <FaTelegram />
            </a>
          </li>
          <li>
            <a href='#'>
              <FaTwitter />
            </a>
          </li>
          <li>
            <a href='#'>
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a href='#'>
              <FaFacebook />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructor;
