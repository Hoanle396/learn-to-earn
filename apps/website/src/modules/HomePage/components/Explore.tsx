'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { ExploreCard, TitleText, TypingText } from '@/components';
import { staggerContainer } from '@/utils/motion';
import styles from '@/utils/styles';

export const exploreWorlds = [
  {
    id: 'world-1',
    imgUrl: '/images/planet-01.png',
    title: 'The Hogwarts',
  },
  {
    id: 'world-2',
    imgUrl: '/images/planet-02.png',
    title: 'The Upside Down',
  },
  {
    id: 'world-3',
    imgUrl: '/images/planet-03.png',
    title: 'Kadirojo Permai',
  },
  {
    id: 'world-4',
    imgUrl: '/images/planet-04.png',
    title: 'Paradise Island',
  },
  {
    id: 'world-5',
    imgUrl: '/images/planet-05.png',
    title: 'Hawkins Labs',
  },
];

const Explore = () => {
  const [active, setActive] = useState('world-2');

  return (
    <section className={`${styles.paddings}`} id='explore'>
      <motion.div
        // @ts-expect-error ignore
        variants={staggerContainer}
        initial='hidden'
        whileInView='show'
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title='| The World' textStyles='text-center' />
        <TitleText
          title={
            <>
              Choose the world you want <br className='md:block hidden' /> to explore
            </>
          }
          textStyles='text-center'
        />
        <div className='mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5'>
          {exploreWorlds.map((world, index) => (
            <ExploreCard key={world.id} {...world} index={index} active={active} handleClick={setActive} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
