"use client";

import { footerVariants } from "@/utils/motion";
import { motion } from "framer-motion";
export const socials = [
  {
    name: "twitter",
    url: "/images/twitter.svg",
  },
  {
    name: "linkedin",
    url: "/images/linkedin.svg",
  },
  {
    name: "instagram",
    url: "/images/instagram.svg",
  },
  {
    name: "facebook",
    url: "/images/facebook.svg",
  },
];

const Footer = () => (
  <motion.footer
    variants={footerVariants}
    initial="hidden"
    whileInView="show"
    className={`py-8 relative`}
  >
    <div className="footer-gradient" />
    <div className={`container mx-auto flex flex-col gap-8`}>
      <div className="flex flex-col">
        <div className="mb-[50px] h-[2px] bg-white opacity-10" />

        <div className="flex items-center justify-between flex-wrap gap-4">
          <img src="/logo_full.svg" alt="logo" className="w-36" />
          <p className="font-normal text-[14px] opacity-50">
            Copyright © 2024 - 2025 Le Huu Hoan. All rights reserved.
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <img
                key={social.name}
                src={social.url}
                alt={social.name}
                className="w-[24px] h-[24px] object-contain cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.footer>
);

export default Footer;
