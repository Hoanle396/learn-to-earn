'use client';
import { motion } from 'framer-motion';
import React from 'react';
import { IconContext } from 'react-icons';
import {
  IoSchool,
  IoBook,
  IoLaptop,
  IoPeople,
  IoChatbubbles,
  IoGlobe,
  IoRocket,
  IoTrophy,
  IoChevronForward,
} from 'react-icons/io5';

const container = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: 'easeInOut',
      duration: 0.2,
    },
  },
};

const hoverEffect = {
  whileHover: {
    scale: 1.5,
    rotate: 630,
    borderRadius: '100%',
  },
  whileTap: {
    scale: 0.8,
    rotate: 630,
    borderRadius: '100%',
  },
};

const OurService: React.FC = () => {
  return (
    <motion.div className='container service_container'>
      <div className='title_wrapper'>
        <motion.p
          className='service_title'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.8 }}
        >
          Our Services
        </motion.p>
        <motion.h2
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          Enhance Your Learning Experience
          <br />
          With Our Comprehensive Services.
        </motion.h2>
      </div>

      <motion.div
        className='service_card'
        variants={container}
        initial='hidden'
        exit='exit'
        whileInView='show'
        viewport={{ once: false }}
      >
        <motion.div className='card' variants={item}>
          <motion.span
            className='service_icon'
            style={{ backgroundColor: '#ddfbf9' }}
            variants={hoverEffect}
            whileHover='whileHover'
            whileTap='whileTap'
          >
            <IoSchool />
          </motion.span>
          <h3>
            Online Courses
            <br />
            For All Levels
          </h3>
          <a href='#'>
            <span>learn more</span>
            <IoChevronForward />
          </a>
        </motion.div>

        <motion.div className='card' variants={item}>
          <motion.span
            className='service_icon'
            style={{ backgroundColor: '#e7daf8' }}
            variants={hoverEffect}
            whileHover='whileHover'
            whileTap='whileTap'
          >
            <IconContext.Provider value={{ color: '#5700cf', size: '22px' }}>
              <IoBook />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Comprehensive
            <br />
            Study Materials
          </h3>
          <a href='#'>
            <span>learn more</span>
            <IoChevronForward />
          </a>
        </motion.div>
        <motion.div className='card' variants={item}>
          <motion.span
            className='service_icon'
            style={{ backgroundColor: '#ffede6' }}
            variants={hoverEffect}
            whileHover='whileHover'
            whileTap='whileTap'
          >
            <IoLaptop color='#ff8559' />
          </motion.span>
          <h3>
            Interactive
            <br />
            Learning Tools
          </h3>
          <a href='#'>
            <span>learn more</span>
            <IconContext.Provider value={{ color: '#14da8f', size: '18px' }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className='card' variants={item}>
          <motion.span
            className='service_icon'
            style={{ backgroundColor: '#ffe1e9' }}
            variants={hoverEffect}
            whileHover='whileHover'
            whileTap='whileTap'
          >
            <IconContext.Provider value={{ color: '#fa3970', size: '22px' }}>
              <IoPeople />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Community
            <br />
            Support
          </h3>
          <a href='#'>
            <span>learn more</span>
            <IconContext.Provider value={{ color: '#14da8f', size: '18px' }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className='card' variants={item}>
          <motion.span
            className='service_icon'
            style={{ backgroundColor: '#dcedff' }}
            variants={hoverEffect}
            whileHover='whileHover'
            whileTap='whileTap'
          >
            <IconContext.Provider value={{ color: '#56a8f4', size: '22px' }}>
              <IoChatbubbles />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Live
            <br />
            Webinars
          </h3>
          <a href='#'>
            <span>learn more</span>
            <IconContext.Provider value={{ color: '#14da8f', size: '18px' }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className='card' variants={item}>
          <motion.span
            className='service_icon'
            style={{ backgroundColor: '#dbf9ed' }}
            variants={hoverEffect}
            whileHover='whileHover'
            whileTap='whileTap'
          >
            <IconContext.Provider value={{ color: '#06d786', size: '22px' }}>
              <IoGlobe />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Global
            <br />
            Certifications
          </h3>
          <a href='#'>
            <span>learn more</span>
            <IconContext.Provider value={{ color: '#14da8f', size: '18px' }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className='card' variants={item}>
          <motion.span
            className='service_icon'
            style={{ backgroundColor: '#fffada' }}
            variants={hoverEffect}
            whileHover='whileHover'
            whileTap='whileTap'
          >
            <IconContext.Provider value={{ color: '#f1df11', size: '22px' }}>
              <IoRocket />
            </IconContext.Provider>
          </motion.span>
          <h3>
            Career
            <br />
            Advancement
          </h3>
          <a href='#'>
            <span>learn more</span>
            <IconContext.Provider value={{ color: '#14da8f', size: '18px' }}>
              <IoChevronForward />
            </IconContext.Provider>
          </a>
        </motion.div>
        <motion.div className='card dark' variants={item}>
          <img src='/images/line.png' alt='line' className='line' />
          <h2>
            +4 <br />
            More...
          </h2>
          <a href='#'>
            <span>View more...</span>
            <motion.span
              className='service_icon'
              style={{ backgroundColor: '#14da8f' }}
              variants={hoverEffect}
              whileHover='whileHover'
              whileTap='whileTap'
            >
              <IconContext.Provider value={{ color: '#fff', size: '18px' }}>
                <IoChevronForward />
              </IconContext.Provider>
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default OurService;
