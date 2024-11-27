import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const AnimationLoading = () => {
  const containerRef = useRef<HTMLElement | null>(null);

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

export default AnimationLoading;
