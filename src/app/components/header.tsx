"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Header = () => {
  const words = ["Our Company"];
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          if (charIndex > 0) {
            setCharIndex(charIndex - 1);
          } else {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        } else {
          if (charIndex < words[wordIndex].length) {
            setCharIndex(charIndex + 1);
          } else {
            setIsDeleting(true);
          }
        }
      },
      isDeleting ? 100 : 200,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  useEffect(() => {
    setText(words[wordIndex].slice(0, charIndex));
  }, [charIndex, wordIndex, words]);

  return (
    <div className="h-[calc(100vh-100px)] container mx-auto flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4 w-full max-w-4xl">
        <div className="mb-4">
          <h1 className="text-6xl text-center md:text-start font-bold">
            Welcome to <br /> <span className="text-primary">{text}</span>
          </h1>
          <p className="text-gray-500 mt-3 text-center md:text-start">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
            sapiente perferendis dolor voluptate ipsam deserunt, dolorum
            mollitia!
          </p>
          <div className="flex justify-center md:justify-start mt-3">
            <button className="bg-primary hover:bg-orange-500 font-semibold text-white px-4 py-2 text-sm rounded-lg">
              Go to Product
            </button>
          </div>
        </div>
        <div className="flex-shrink-0 relative w-full h-[280px] mt-10 md:mt-0">
          <Image
            src="/blob.svg"
            alt="blob"
            layout="fill"
            objectFit="contain"
            className="z-0 scale-[2.5] hidden md:block top-8 left-8"
          />
          <Image
            src="/banner.svg"
            alt="banner"
            layout="fill"
            objectFit="contain"
            className="z-10"
          />
        </div>
      </div>
    </div>
  );
};
