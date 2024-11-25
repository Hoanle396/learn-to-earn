"use client";

import { textContainer, textVariant2 } from "@/utils/motion";
import { motion } from "framer-motion";
import React from "react";

interface TypingTextProps {
  title: React.ReactNode | string;
  textStyles?: string;
}

export const TypingText = ({ title, textStyles }: TypingTextProps) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[14px] text-secondary-white ${textStyles}`}
  >
    {Array.from(title as string).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles }: TypingTextProps) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] ${textStyles}`}
  >
    {title}
  </motion.h2>
);
