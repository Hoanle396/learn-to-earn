"use client"
import { motion, Variants } from 'framer-motion';
import React from 'react';
import { IoChevronForwardCircle, IoStar } from 'react-icons/io5';

const easing = [0.6, -0.05, 0.01, 0.99];

const stagger: Variants = {
  animate: {
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.2,
      staggerDirection: 1
    }
  }
}

const fadeInUp: Variants = {
  initial: {
    y: -60,
    opacity: 0,
    transition: {
      duration: 0.6, ease: easing
    }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: easing
    }
  }
};

const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const firstName: Variants = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
      staggerDirection: -1
    }
  }
}

const lastName: Variants = {
  initial: {
    y: -20,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.04,
      staggerDirection: 1
    }
  }
}

const letter: Variants = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { ...transition, duration: 1 }
  }
};

const btnGroup: Variants = {
  initial: {
    y: -60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: 0.5,
      ease: easing
    }
  }
};
const star: Variants = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.8, ease: easing }
  },
  animate: {
    y: 0,
    opacity: 1,
  }
};

const Hero: React.FC = () => {
  return (
    <motion.div initial='initial' animate='animate' className='min-h-screen h-full content_wrapper'>
      <motion.div className="content_wrapper container mx-auto h-full" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: easing }}>
        <div className="left_content_wrapper">

          <motion.h2>

            <motion.span variants={firstName} initial="initial" animate="animate" className='first'>
              <motion.span variants={letter}>U</motion.span>
              <motion.span variants={letter}>n</motion.span>
              <motion.span variants={letter}>l</motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>c</motion.span>
              <motion.span variants={letter}>k</motion.span>
              <motion.span variants={letter} className="second">T</motion.span>
              <motion.span variants={letter}>h</motion.span>
              <motion.span variants={letter}>e</motion.span>
              <motion.span variants={letter} className="second">F</motion.span>
              <motion.span variants={letter}>e</motion.span>
              <motion.span variants={letter}>a</motion.span>
              <motion.span variants={letter}>t</motion.span>
              <motion.span variants={letter}>u</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter}>e</motion.span>
            </motion.span>
            <motion.span variants={lastName} initial="initial" animate="animate" className='last'>
              <motion.span variants={letter} className="second">C</motion.span>
              <motion.span variants={letter}>e</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter}>t</motion.span>
              <motion.span variants={letter}>i</motion.span>
              <motion.span variants={letter}>f</motion.span>
              <motion.span variants={letter}>y</motion.span>
              <motion.span variants={letter} className="second">Y</motion.span>
              <motion.span variants={letter}>o</motion.span>
              <motion.span variants={letter}>u</motion.span>
              <motion.span variants={letter}>r</motion.span>
              <motion.span variants={letter} className="second">S</motion.span>
              <motion.span variants={letter}>k</motion.span>
              <motion.span variants={letter}>i</motion.span>
              <motion.span variants={letter}>l</motion.span>
              <motion.span variants={letter}>l</motion.span>
              <motion.span variants={letter}>s</motion.span>
            </motion.span>
          </motion.h2>

          <motion.p variants={fadeInUp}>
            Master a wide range of skills and certify your expertise with our comprehensive courses. Unlock new career opportunities and stay ahead in the industry.
          </motion.p>

          <motion.div className="flex justify-start gap-6" variants={stagger}>
            <motion.button
              className="rounded-full text-lg flex gap-2 appearance-none h-12 w-fit px-7 hover:bg-slate-200 border-2 cursor-pointer items-center justify-center font-medium"
              variants={btnGroup}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get started
              <IoChevronForwardCircle />
            </motion.button>
            <motion.button
              className="rounded-full text-lg flex gap-2 appearance-none h-12 w-fit px-7 hover:bg-slate-200 border-2 cursor-pointer items-center justify-center font-medium"
              variants={btnGroup}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More
              <IoChevronForwardCircle />
            </motion.button>
          </motion.div>
          <motion.div className="review_container" variants={stagger}>
            <motion.p className="total_review" variants={star}>64+ Reviews</motion.p>
            <div className='flex'>
              <motion.span className='h-10 w-10 justify-center items-center flex' variants={star} whileHover={{ scale: 1.2, rotate: 180, borderRadius: '100%', cursor: 'pointer' }}><IoStar /></motion.span>
              <motion.span className='h-10 w-10 justify-center items-center flex' variants={star} whileHover={{ scale: 1.2, rotate: 180, borderRadius: '100%', cursor: 'pointer' }}><IoStar /></motion.span>
              <motion.span className='h-10 w-10 justify-center items-center flex' variants={star} whileHover={{ scale: 1.2, rotate: 180, borderRadius: '100%', cursor: 'pointer' }}><IoStar /></motion.span>
              <motion.span className='h-10 w-10 justify-center items-center flex' variants={star} whileHover={{ scale: 1.2, rotate: 180, borderRadius: '100%', cursor: 'pointer' }}><IoStar /></motion.span>
              <motion.span className='h-10 w-10 justify-center items-center flex' variants={star} whileHover={{ scale: 1.2, rotate: 180, borderRadius: '100%', cursor: 'pointer' }}><IoStar /></motion.span>
            </div>
            <motion.p className="more_review" variants={star}>More then 50+ people taking services.</motion.p>
          </motion.div>
        </div>
        <motion.div className="right_content_wrapper">
          <motion.img src='/images/bg.png' alt="bg" initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: .5, delay: 0.8 }} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Hero;
