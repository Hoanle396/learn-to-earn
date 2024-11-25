import React from "react";

const Rating = () => {
  return (
    <div className="rating-overview">
      <div className="rating-overview-box">
        <span className="rating-overview-box-total">4.2</span>
        <span className="rating-overview-box-percent">out of 5.0</span>
        <div className="star-rating" data-rating={5}>
          <i className="ti-star" />
          <i className="ti-star" />
          <i className="ti-star" />
          <i className="ti-star" />
          <i className="ti-star" />
        </div>
      </div>
      <div className="rating-bars">
        <div className="rating-bars-item">
          <span className="rating-bars-name">5 Star</span>
          <span className="rating-bars-inner">
            <span className="rating-bars-rating high" data-rating="4.7">
              <span
                className="rating-bars-rating-inner"
                style={{ width: "85%" }}
              />
            </span>
            <strong>85%</strong>
          </span>
        </div>
        <div className="rating-bars-item">
          <span className="rating-bars-name">4 Star</span>
          <span className="rating-bars-inner">
            <span className="rating-bars-rating good" data-rating="3.9">
              <span
                className="rating-bars-rating-inner"
                style={{ width: "75%" }}
              />
            </span>
            <strong>75%</strong>
          </span>
        </div>
        <div className="rating-bars-item">
          <span className="rating-bars-name">3 Star</span>
          <span className="rating-bars-inner">
            <span className="rating-bars-rating mid" data-rating="3.2">
              <span
                className="rating-bars-rating-inner"
                style={{ width: "52.2%" }}
              />
            </span>
            <strong>53%</strong>
          </span>
        </div>
        <div className="rating-bars-item">
          <span className="rating-bars-name">1 Star</span>
          <span className="rating-bars-inner">
            <span className="rating-bars-rating poor" data-rating={2.0}>
              <span
                className="rating-bars-rating-inner"
                style={{ width: "20%" }}
              />
            </span>
            <strong>20%</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Rating;
