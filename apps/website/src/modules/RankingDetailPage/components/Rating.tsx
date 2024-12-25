import React from 'react';

const Rating = () => {
  const star1 = Math.floor(Math.random() * 5);
  const star2 = Math.floor(Math.random() * 5);
  const star3 = Math.floor(Math.random() * 5);
  const star4 = Math.floor(Math.random() * 5);
  const star5 = Math.floor(Math.random() * 5);

  const avg = (star1 + star2 + star3 + star4 + star5) / 5;
  return (
    <div className='rating-overview'>
      <div className='rating-overview-box'>
        <span className='rating-overview-box-total'>{avg}</span>
        <span className='rating-overview-box-percent'>out of 5.0</span>
        <div className='star-rating' data-rating={5}>
          <i className='ti-star' />
          <i className='ti-star' />
          <i className='ti-star' />
          <i className='ti-star' />
          <i className='ti-star' />
        </div>
      </div>
      <div className='rating-bars'>
        <div className='rating-bars-item'>
          <span className='rating-bars-name'>5 Star</span>
          <span className='rating-bars-inner'>
            <span className='rating-bars-rating high' data-rating='4.7'>
              <span className='rating-bars-rating-inner' style={{ width: `${(star5 * 100) / 5}%` }} />
            </span>
            <strong>{(star5 * 100) / 5}%</strong>
          </span>
        </div>
        <div className='rating-bars-item'>
          <span className='rating-bars-name'>4 Star</span>
          <span className='rating-bars-inner'>
            <span className='rating-bars-rating good' data-rating='3.9'>
              <span className='rating-bars-rating-inner' style={{ width: `${(star4 * 100) / 5}%` }} />
            </span>
            <strong>{(star4 * 100) / 5}%</strong>
          </span>
        </div>
        <div className='rating-bars-item'>
          <span className='rating-bars-name'>3 Star</span>
          <span className='rating-bars-inner'>
            <span className='rating-bars-rating mid' data-rating='3.2'>
              <span className='rating-bars-rating-inner' style={{ width: `${(star3 * 100) / 5}%` }} />
            </span>
            <strong>{(star3 * 100) / 5}%</strong>
          </span>
        </div>
        <div className='rating-bars-item'>
          <span className='rating-bars-name'>2 Star</span>
          <span className='rating-bars-inner'>
            <span className='rating-bars-rating poor' data-rating={2.0}>
              <span className='rating-bars-rating-inner' style={{ width: `${(star2 * 100) / 5}%` }} />
            </span>
            <strong>{(star2 * 100) / 5}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Rating;
