'use client';

import { TitleText, TypingText } from '@/components';
import InsightCard from '@/components/InsightCard';
import { staggerContainer } from '@/utils/motion';
import styles from '@/utils/styles';
import { motion } from 'framer-motion';

export const insights = [
  {
    imgUrl: '/images/planet-06.png',
    title: 'The launch of the Metaverse makes Elon musk ketar-ketir',
    subtitle:
      'Magna etiam tempor orci eu lobortis elementum nibh tellus molestie. Diam maecenas sed enim ut sem viverra alique.',
  },
  {
    imgUrl: '/images/planet-07.png',
    title: '7 tips to easily master the madness of the Metaverse',
    subtitle:
      'Vitae congue eu consequat ac felis donec. Et magnis dis parturient montes nascetur ridiculus mus. Convallis tellus id interdum',
  },
  {
    imgUrl: '/images/planet-08.png',
    title: 'With one platform you can explore the whole world virtually',
    subtitle:
      'Quam quisque id diam vel quam elementum. Viverra nam libero justo laoreet sit amet cursus sit. Mauris in aliquam sem',
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
      <TitleText title={<>Insight about metaverse</>} textStyles='text-center' />
      <div className='mt-[50px] flex flex-col gap-[30px]'>
        {insights.map((item, index) => (
          <InsightCard key={`insight-${index}`} {...item} index={index + 1} />
        ))}
      </div>
    </motion.div>
  </section>
);

export default Insights;
