'use client';

import { TitleText, TypingText } from '@/components';
import NewFeatures from '@/components/NewFeatures';
import { fadeIn, planetVariants, staggerContainer } from '@/utils/motion';
import styles from '@/utils/styles';
import { motion } from 'framer-motion';

export const newFeatures = [
  {
    imgUrl: '/images/vrpano.svg',
    title: 'New Online Courses',
    subtitle: 'Explore our latest online courses designed to help you learn new skills and advance your career.',
  },
  {
    imgUrl: '/images/headset.svg',
    title: 'Live Webinars',
    subtitle: 'Join our live webinars to interact with experts and get your questions answered in real-time.',
  },
];

const WhatsNew = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      // @ts-expect-error ignore
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div variants={fadeIn('right', 'tween', 0.2, 1)} className='flex-[0.95] flex justify-center flex-col'>
        <TypingText title='| Whats new?' />
        <TitleText title={<>What&apos;s new in Our Learning Platform?</>} />
        <div className='mt-[48px] flex flex-wrap justify-between gap-[24px]'>
          {newFeatures.map((feature) => (
            <NewFeatures key={feature.title} {...feature} />
          ))}
        </div>
      </motion.div>

      <motion.div variants={planetVariants('right')} className={`flex-1 ${styles.flexCenter}`}>
        <img src='/images/whats-new.png' alt='get-started' className='w-[90%] h-[90%] object-contain' />
      </motion.div>
    </motion.div>
  </section>
);

export default WhatsNew;
