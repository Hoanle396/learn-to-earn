import React from 'react';
import { FaHeart, FaStar, FaThumbsDown, FaThumbsUp } from 'react-icons/fa';

const ReviewCourse = () => {
  return (
    <div className='list-single-main-item fl-wrap'>
      <div className='list-single-main-item-title fl-wrap'>
        <h3>
          Item Reviews - <span> 3 </span>
        </h3>
      </div>
      <div className='reviews-comments-wrap'>
        {/* reviews-comments-item */}
        <div className='reviews-comments-item'>
          <div className='review-comments-avatar'>
            <img src='https://via.placeholder.com/500x500' className='img-fluid' alt='' />
          </div>
          <div className='reviews-comments-item-text'>
            <h4>
              <a href='#'>Josaph Manrty</a>
              <span className='reviews-comments-item-date'>
                <i className='ti-calendar theme-cl' />
                27 Oct 2019
              </span>
            </h4>
            <div className='flex gap-1'>
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
            </div>
            <div className='clearfix' />
            <p>
              Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim. Sem felis, ullamcorper vel
              aliquam non, varius eget justo. Duis quis nunc tellus sollicitudin mauris.
            </p>
            <div className='pull-left reviews-reaction flex'>
              <a href='#' className='comment-like active flex gap-1 items-center'>
                <FaThumbsUp /> 12
              </a>
              <a href='#' className='comment-dislike active flex gap-1 items-center'>
                <FaThumbsDown /> 1
              </a>
              <a href='#' className='comment-love active flex gap-1 items-center'>
                <FaHeart /> 07
              </a>
            </div>
          </div>
        </div>
        {/*reviews-comments-item end*/}
        {/* reviews-comments-item */}
        <div className='reviews-comments-item'>
          <div className='review-comments-avatar'>
            <img src='https://via.placeholder.com/500x500' className='img-fluid' alt='' />
          </div>
          <div className='reviews-comments-item-text'>
            <h4>
              <a href='#'>Rita Chawla</a>
              <span className='reviews-comments-item-date'>
                <i className='ti-calendar theme-cl' />2 Nov May 2019
              </span>
            </h4>
            <div className='flex gap-1'>
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar />
            </div>
            <div className='clearfix' />
            <p>
              Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim. Sem felis, ullamcorper vel
              aliquam non, varius eget justo. Duis quis nunc tellus sollicitudin mauris.
            </p>
            <div className='pull-left reviews-reaction flex'>
              <a href='#' className='comment-like active flex gap-1 items-center'>
                <FaThumbsUp /> 12
              </a>
              <a href='#' className='comment-dislike active flex gap-1 items-center'>
                <FaThumbsDown /> 1
              </a>
              <a href='#' className='comment-love active flex gap-1 items-center'>
                <FaHeart /> 07
              </a>
            </div>
          </div>
        </div>
        {/*reviews-comments-item end*/}
        {/* reviews-comments-item */}
        <div className='reviews-comments-item'>
          <div className='review-comments-avatar'>
            <img src='https://via.placeholder.com/500x500' className='img-fluid' alt='' />
          </div>
          <div className='reviews-comments-item-text'>
            <h4>
              <a href='#'>Adam Wilsom</a>
              <span className='reviews-comments-item-date'>
                <i className='ti-calendar theme-cl' />
                10 Nov 2019
              </span>
            </h4>
            <div className='flex gap-1'>
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
              <FaStar className='text-secondary' />
            </div>
            <div className='clearfix' />
            <p>
              Commodo est luctus eget. Proin in nunc laoreet justo volutpat blandit enim. Sem felis, ullamcorper vel
              aliquam non, varius eget justo. Duis quis nunc tellus sollicitudin mauris.
            </p>
            <div className='pull-left reviews-reaction flex'>
              <a href='#' className='comment-like active flex gap-1 items-center'>
                <FaThumbsUp /> 12
              </a>
              <a href='#' className='comment-dislike active flex gap-1 items-center'>
                <FaThumbsDown /> 1
              </a>
              <a href='#' className='comment-love active flex gap-1 items-center'>
                <FaHeart /> 07
              </a>
            </div>
          </div>
        </div>
        {/*reviews-comments-item end*/}
      </div>
    </div>
  );
};

export default ReviewCourse;
