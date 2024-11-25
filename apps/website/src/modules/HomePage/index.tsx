import Explore from "./components/Explore";
import FAQ from "./components/FAQs";
import Feedback from "./components/Feedback";
import GetStarted from "./components/GetStarted";
import Hero from "./components/Hero";
import Insights from "./components/Insights";
import OurService from "./components/OurService";
import WhatsNew from "./components/WhatsNew";
import World from "./components/World";

const HomePage = () => {
  return (
    <>
      <Hero />
      <OurService />
      <div className="relative">
        <div className="gradient-03 z-0" />
        <Explore />
      </div>
      <div className="relative">
        <GetStarted />
        <div className="gradient-04 z-0" />
        <WhatsNew />
      </div>
      <World />
      <div className="relative">
        <Insights />
        <div className="gradient-04 z-0" />
        <Feedback />
      </div>
      <FAQ />
    </>
  );
};

export default HomePage;
