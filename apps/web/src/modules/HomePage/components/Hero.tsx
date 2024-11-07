"use client";
import React from "react";

import Image from "next/image";

const Hero = () => {
  return (
    <div className="!flex h-[55vh] w-full items-center justify-between px-10 py-">
      <Image
        width={1200}
        height={1200}
        src="/image/image-hero.svg"
        alt="bg-img"
        className="absolute inset-0 ml-auto w-[920px] h-[780px] rounded-bl-[100px] object-cover object-center"
      />
      <div className="container mx-auto mt-28">
        <div className="grid grid-cols-12 text-center lg:text-left">
          <div className="col-span-full rounded-xl border border-white bg-white/90 py-10 p-8 shadow-lg shadow-black/10 backdrop-blur-sm backdrop-saturate-200 xl:col-span-7">
            <h1

              className="lg:text-5xl !leading-snug text-3xl lg:max-w-3xl text-primary"
            >
              Unlock the Power of the Web with Our Expert Courses
            </h1>
            <h2 className="mb-10 mt-6 !text-sepia-skin">
              Are you ready to embark on an exciting journey into the world of
              web development? Look no further! We are your trusted partner for
              mastering the art of web development.
            </h2>
            <div className="mb-8 flex justify-center gap-4 lg:justify-start">
              <button color="gray">view all courses</button>
              <button color="gray">
                see pricing
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-between gap-4 lg:justify-start">
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-pinterest.svg"
                alt="pinterest"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-netflix.svg"
                alt="netflix"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-coinbase.svg"
                alt="coinbase"
              />
              <Image
                width={144}
                height={144}
                className="w-36 grayscale opacity-60"
                src="/logos/logo-google.svg"
                alt="google"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero;
