import { useEffect, useState } from "react";

type WindowDimensions = {
  width: number | undefined;
  height: number | undefined;
};

const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    const timerId = setTimeout(() => {
      console.log("handleResize");
      handleResize();
      window.addEventListener("resize", handleResize);
    }, 1000);

    return (): void => {
      console.log("cleanup");
      clearTimeout(timerId);
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth, window.innerHeight]);

  return windowDimensions;
};

export default useWindowDimensions;
