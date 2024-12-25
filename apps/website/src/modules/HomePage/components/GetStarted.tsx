'use client';

import { motion } from 'framer-motion';

import { TitleText, TypingText } from '@/components';
import StartSteps from '@/components/StartSteps';
import { fadeIn, planetVariants, staggerContainer } from '@/utils/motion';
import styles from '@/utils/styles';

export const startingFeatures = [
  'Find a world that suits you and you want to enter',
  'Enter the world by reading basmalah to be safe',
  'No need to beat around the bush, just stay on the gas and have fun',
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
        <TypingText title='| How Metaversus Works' />
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
