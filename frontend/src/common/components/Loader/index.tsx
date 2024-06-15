/* eslint-disable react/no-array-index-key */
// import Lottie from "lottie-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

import docOClockAnimation from "@/common/animations/input-loader-animation.json";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

type LoaderProps = {
  children?: React.ReactNode;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  isCustom?: boolean;
};

const Loader: React.FC<LoaderProps> = ({
  children,
  isLoading,
  isSuccess,
  isError,
  isCustom,
}) => {
  const [isEnded, setIsEnded] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) setIsEnded(false);
  }, [isLoading]);

  if (isEnded) return null;

  if (!isCustom && (isLoading || isSuccess || isError)) {
    return (
      <div className="absolute left-0 top-0 z-[1000]">
        <div className="fixed flex h-screen w-full flex-col items-center justify-center bg-black/50 backdrop-blur-md transition-all">
          <Lottie animationData={docOClockAnimation} loop className="w-1/4" />
        </div>
      </div>
    );
  }
  if (!children) {
    return null;
  }

  return (
    <div className="absolute left-0 top-0 z-[1000]">
      <div className="fixed flex h-screen w-full flex-col items-center justify-center bg-black/50 backdrop-blur-md transition-all">
        {children}
      </div>
    </div>
  );
};

export default Loader;
