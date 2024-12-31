'use client';

import { TitleText, TypingText } from '@/components';
import InsightCard from '@/components/InsightCard';
import { staggerContainer } from '@/utils/motion';
import styles from '@/utils/styles';
import { motion } from 'framer-motion';

export const insights = [
  {
    imgUrl: '/images/planet-06.png',
    title: 'The Future of Online Learning: Trends to Watch',
    subtitle:
      'Explore the latest trends in online learning and how they are shaping the future of education. From AI to gamification, discover what\'s next.',
  },
  {
    imgUrl: '/images/planet-07.png',
    title: 'Top 10 Tips for Effective Online Learning',
    subtitle:
      'Learn how to make the most of your online learning experience with these top tips. From time management to staying motivated, we\'ve got you covered.',
  },
  {
    imgUrl: '/images/planet-08.png',
    title: 'How to Choose the Right Online Course for You',
    subtitle:
      'With so many online courses available, it can be hard to choose the right one. Here are some tips to help you find the perfect course for your needs.',
  },
];

const Insights = () => (
  <section className={`${styles.paddings} relative z-10`}>
    <motion.div
      // @ts-expect-error ignore
      variants={staggerContainer}
      initial='hidden'
      whileInView='show'
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-col`}
    >
      <TypingText title='| Insight' textStyles='text-center' />
      <TitleText title={<>Insight about Blockchain</>} textStyles='text-center' />
      <div className='mt-[50px] flex flex-col gap-[30px]'>
        {insights.map((item, index) => (
          <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default Insights;
