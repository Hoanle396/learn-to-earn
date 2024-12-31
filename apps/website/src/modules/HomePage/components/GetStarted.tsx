'use client';

import { motion } from 'framer-motion';

import { TitleText, TypingText } from '@/components';
import StartSteps from '@/components/StartSteps';
import { fadeIn, planetVariants, staggerContainer } from '@/utils/motion';
import styles from '@/utils/styles';

export const startingFeatures = [
  'Browse our extensive course catalog and find the perfect course for you',
  'Enroll in the course and start learning at your own pace',
  'Complete the course and earn your certification',
];

const GetStarted = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      // @ts-expect-error ignore
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
    >
      <motion.div variants={planetVariants('left')} className={`flex-1 ${styles.flexCenter}`}>
        <img src='/images/get-started.png' alt='get-started' className='w-[90%] h-[90%] object-contain' />
      </motion.div>
      <motion.div variants={fadeIn('left', 'tween', 0.2, 1)} className='flex-[0.75] flex justify-center flex-col'>
        <TypingText title='| How Our Platform Works' />
        <TitleText title={<>Get started with just a few clicks</>} />
        <div className='mt-[31px] flex flex-col max-w-[370px] gap-[24px]'>
          {startingFeatures.map((feature, index) => (
            <StartSteps key={feature} number={`${index < 10 ? '0' : ''} ${index + 1}`} text={feature} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  </section>
);

export default GetStarted;
