"use client";
import Instructor from "./components/Instructor";
import OverviewCourse from "./components/OverviewCourse";
import PageTitle from "./components/PageTitle";
import Rating from "./components/Rating";
import ReviewCourse from "./components/ReviewCourse";
import Sidebar from "./components/Sidebar";

const RankingDetailPage = ({}) => {
  return (
    <div>
      {/* ============================ Page Title Start================================== */}
      <PageTitle />
      {/* ============================ Page Title End ================================== */}
      {/* ============================ Course Detail ================================== */}
      <section className="flex">
        <div className="container mx-auto">
          <div className="grid grid-cols-3">
            <div className="lg:col-span-2 col-span-1">
              {/* Overview */}
              <OverviewCourse />
              {/* Rating */}
              <Rating />
              {/* instructor */}
              <Instructor />
              {/* Reviews */}
              <ReviewCourse />
            </div>
            {/* Sidebar */}
            <Sidebar />
          </div>
        </div>
      </section>
      {/* ============================ Course Detail ================================== */}
    </div>
  );
};

export default RankingDetailPage;
