'use client';
import React, { useEffect, useMemo, useState } from 'react';

import { useAnswersStore } from '@/stores';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { usePoolById } from '@/apis/pool/queries';
import useSubmit from '@/hooks/useSubmitAnswer';
type Props = {};

const page = (props: Props) => {
  const { id } = useParams();
  const { data } = usePoolById(Number(id));
  const { setAnswers, setPool, poolId, answers, clear } = useAnswersStore();
  const { publish, isTransactionSuccess } = useSubmit()

  useEffect(() => {
    setPool(data?.data.onchainId);
  }, [data]);

  const [question, setQuestion] = useState<number>(0);
  const [progressBar, setProgressBar] = useState<number>(10);
  const [selectedAnswer, setSelectedAnswer] = useState<String | undefined>('');
  const [showNextQuestion, setShowNextQuestion] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const { push } = useRouter()

  let [currentQuestion, numberOfQuestions] = useMemo(
    () => [data?.data?.quizzes[question], data?.data?.quizzes.length],
    [question, data]
  );
  const handleSubmit = () => {
    if (selectedAnswer === '') {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }
    setAnswers(selectedAnswer);
    setShowNextQuestion(true);
  };

  const handleSelectedAnswer = (answer: String | undefined) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer('');
    setQuestion(question + 1);
    setProgressBar(progressBar + 10);
    setShowNextQuestion(false);
  };

  const handleSubmitOnChain = async () => {
    try {
      publish({ poolId, answers })
    } catch (error) {

    }
  }

  useEffect(() => {
    if (isTransactionSuccess) {
      clear()
      push('/ranking')
    }
  }, [isTransactionSuccess])

  return (
    <>
      {Number(question) === numberOfQuestions ? (
        <section className='container mx-auto mt-20 px-6 sm:px-16 xl:flex xl:px-0 min-h-[calc(100%-320px)]'>
          <div className='xl:w-1/2'>
            <h2 className='text-[40px] font-extralight leading-none sm:text-[48px]'>Quiz completed</h2>
            <h3 className='text-[40px] font-medium leading-snug sm:text-[48px]'>Please wait to pool draw...</h3>
          </div>
          <div className='xl:w-1/2 xl:space-y-8'>
            <section className='mb-3 mt-10 flex flex-col items-center rounded-xl bg-white p-8 drop-shadow-sm dark:bg-navy sm:p-12 xl:mb-0 xl:mt-0 xl:w-[564px]'>
              <div className='flex h-[72px] items-center justify-center'>
                <div className='flex items-center justify-center gap-4'>
                  <h1 className='text-[18px] font-medium sm:text-[28px]'>{data?.data.name}</h1>
                </div>
              </div>
              <div className='flex flex-col items-center w-76 h-76 '>
                <h5 className='text-lg font-light dark:text-lightBluish sm:text-2xl'>
                  to passed this pool you need {data?.data?.questionPerPool} correct answers
                </h5>
              </div>
            </section>
            <button onClick={handleSubmitOnChain} className='hover:bg-primary/80 h-20 w-full rounded-xl bg-primary py-2 text-[18px] font-medium text-white transition-all duration-200 ease-in-out sm:h-[92px] sm:rounded-3xl sm:text-[28px] xl:w-[564px]'>
              Submit your answers
            </button>
          </div>
        </section>
      ) : (
        <section className='container mx-auto mt-20 px-6 sm:px-16 xl:flex xl:w-full xl:px-0 min-h-[calc(100%-320px)]'>
          <div className='mb-10 xl:mb-0 xl:flex xl:h-[452px]  xl:w-1/2 xl:flex-col xl:justify-between'>
            <div className='xl:w-[465px]'>
              <p className='text-sm italic text-greyNavy dark:text-lightBluish sm:text-[20px]'>
                Question {question + 1} of {numberOfQuestions}
              </p>
              <h2 className='text-[20px] font-medium sm:text-[36px]'>{currentQuestion?.question}</h2>
            </div>
            <div className='mt-6 flex h-4 w-full items-center justify-start rounded-full bg-slate-200 px-1 dark:bg-navy xl:w-[465px]'>
              <span className='h-2 rounded-[104px] bg-green-500' style={{ width: `${progressBar}%` }}></span>
            </div>
          </div>
          <div className='xl:w-1/2'>
            <ul className='space-y-3 pb-3 sm:space-y-6 sm:pb-6'>
              {currentQuestion?.options.map((option: any, index: number) => {
                const letter = option.option; // 65 is the ASCII value for 'A'
                const isSelected = selectedAnswer === option.answer;
                return (
                  <li
                    key={index}
                    className={`min-h-14 sm:min-h-20 group flex h-auto w-full cursor-pointer items-center gap-4 rounded-xl border-[3px] bg-white p-3 font-medium drop-shadow-sm dark:bg-navy dark:text-white sm:rounded-3xl xl:min-h-[92px] xl:w-[564px] ${isSelected ? 'border-purple dark:border-purple' : 'border-white'
                      }`}
                    onClick={() => handleSelectedAnswer(option.answer)}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-md bg-primary text-[18px] uppercase text-greyNavy group-hover:bg-primary group-hover:text-purple sm:h-14 sm:w-14 sm:rounded-xl sm:text-[28px] ${isSelected
                        ? 'bg-purple text-white group-hover:bg-purple group-hover:text-white'
                        : 'bg-primary/30'
                        }`}
                    >
                      {letter}
                    </span>
                    <p className='w-[200px] text-base sm:w-[456px] sm:text-[28px] sm:leading-tight'>{option.answer}</p>
                  </li>
                );
              })}
            </ul>
            {!showNextQuestion ? (
              <button
                className='bg-primary/80 hover:bg-primary h-14 w-full rounded-xl bg-purple py-2 text-xs font-semibold text-white transition-all duration-200 ease-in-out sm:h-[92px] sm:rounded-3xl sm:text-[28px] xl:w-[564px]'
                onClick={handleSubmit}
              >
                Submit Answer
              </button>
            ) : (
              <button
                className='bg-primary/80 hover:bg-primary h-14 w-full rounded-xl bg-purple py-2 text-xs font-semibold text-white transition-all duration-200 ease-in-out sm:h-[92px] sm:rounded-3xl sm:text-[28px] xl:w-[564px]'
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            )}
            {error ? (
              <p className='mt-6 flex items-center justify-center gap-2 text-[14px] text-red sm:text-2xl text-red-400'>
                <span>Please select an answer</span>
              </p>
            ) : null}
          </div>
        </section>
      )}
    </>
  );
};

export default page;

export const Idx = ['A', 'B', 'C', 'D'];
