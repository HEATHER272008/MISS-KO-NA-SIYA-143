import { useEffect, useState } from "react";
import logo from "@/assets/FB_IMG_1767617453285.png";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-primary transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="animate-pulse">
          <img
            src={logo}
            alt="BCSI Logo"
            className="h-32 w-32 object-contain"
          />
        </div>
        <div className="h-1 w-48 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-accent animate-[loading_2s_ease-in-out]" />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
