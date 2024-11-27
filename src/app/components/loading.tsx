"use client";
import * as load from "@/public/loaddata.json";
import { useEffect, useRef } from "react";

export default function AnimationLoading() {
  const animationRef = useRef(null);

  async function getLottie() {
    const lot = await import("lottie-web");

    lot.default.loadAnimation({
      autoplay: true,
      loop: true,
      animationData: load,
      container: animationRef.current,
    });
  }
  useEffect(() => {
    getLottie();
  }, []);

  return <div ref={animationRef}></div>;
}
