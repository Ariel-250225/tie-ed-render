import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";

export function useItemResizing(
  windowWidth: number,
  parentsWidth: number,
  gap: number,
  viewLength: number,
  moveFactor: number,
) {
  const theme = useTheme();
  const [isTablet, setIsTablet] = useState(windowWidth < theme.windowSize.HD);
  const [isMobile, setIsMobile] = useState(
    windowWidth < theme.windowSize.tablet,
  );
  const [moveParam, setMoveParam] = useState(moveFactor);
  const [itemWidth, setItemWidth] = useState<number>(
    (parentsWidth - gap * (isTablet ? 2 : viewLength - 1)) /
      (isTablet ? 2 : viewLength),
  );

  useEffect(() => {
    if (windowWidth < theme.windowSize.HD) {
      setIsTablet(true);
      setMoveParam(1);
    } else {
      setIsTablet(false);
      setMoveParam(moveFactor);
    }

    if (windowWidth < theme.windowSize.tablet) {
      setIsMobile(true);
    }
    setItemWidth(
      (parentsWidth - gap * (isTablet ? 1 : viewLength - 1)) /
        (isTablet ? 1 : viewLength),
    );
  }, [
    gap,
    isTablet,
    moveFactor,
    parentsWidth,
    theme.windowSize.HD,
    theme.windowSize.tablet,
    viewLength,
    windowWidth,
  ]);

  return { itemWidth, isTablet, moveParam, isMobile };
}
