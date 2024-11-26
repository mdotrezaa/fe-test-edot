"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Header = () => {
  const words = ["Ipsum"];
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
    ); // Speed up typing and slow down deleting

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
            Lorem <span className="text-primary">{text}</span>
          </h1>
          <p className="text-gray-500 mt-3 text-center md:text-start">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores
            sapiente perferendis dolor voluptate ipsam deserunt, dolorum
            mollitia!
          </p>
          <button className="bg-primary hover:bg-orange-500 font-semibold text-white mt-3 px-4 py-2 text-sm rounded-lg">
            Go to Product
          </button>
        </div>
        <div className="flex-shrink-0">
          <Image
            src="/banner.svg"
            alt="banner"
            layout="intrinsic"
            width={500}
            height={280}
            className="rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
