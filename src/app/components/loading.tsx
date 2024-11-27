import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const LoadingAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/loaddata.json",
      });

      return () => animation.destroy();
    }
  }, []);
  return <div ref={containerRef} style={{ width: 200, height: 200 }} />;
};

export default LoadingAnimation;
