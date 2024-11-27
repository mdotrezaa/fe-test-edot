"use client";
import { useEffect, useRef } from "react";

export default function AnimationLoading() {
  const animationRef = useRef<HTMLElement | null>(null);

  async function getLottie() {
    const lot = await import("lottie-web");

    lot.default.loadAnimation({
      autoplay: true,
      loop: true,
      path: "/loaddata.json",
      container: animationRef.current,
    });
  }
  useEffect(() => {
    getLottie();
  }, []);

  return <div ref={animationRef}></div>;
}
