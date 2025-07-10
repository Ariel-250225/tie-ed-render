import { css, Global, Theme, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import _ from "lodash";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/** @param: width => number 타입을 받아 vw 단위로 width를 결정합니다.
 *  @param: gap => gap 타입을 받아 vw 단위로 width를 결정합니다.
 * :*/
export const PageContainer = styled.div<{
  width: number;
  gap?: number;
}>(
  ({ width, gap = 1 }) => css`
    width: ${width}vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${gap}vw;
    box-sizing: border-box;
  `,
);

export const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export function GlobalStyled() {
  const theme = useTheme();
  return (
    <Global
      styles={css`
        width: 100%;
        position: relative;

        z-index: -1;
        background-color: ${theme.mode.bodyBackground};

        html {
          font-size: 1vw;

          ::-webkit-scrollbar {
            display: none;
          }
        }

        #root {
          width: 100%;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          ::-webkit-scrollbar {
            display: none;
          }
        }

        :root {
          font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
          line-height: 1.5;
          font-weight: 400;

          color-scheme: light dark;

          color: ${theme.mode.textPrimary};
          background-color: ${theme.mode.bodyBackground};

          font-synthesis: none;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        body {
          margin: 0;
          display: flex;
          place-items: center;
          min-width: 320px;
          min-height: 100vh;
          color: ${theme.mode.textPrimary};
          background-color: ${theme.mode.bodyBackground};
          align-items: flex-start;
        }

        div[data-overlay-container="true"] {
          width: 100vw !important;
          max-width: 100%;

          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
        }

        a {
          text-decoration: none;
        }
      `}
    />
  );
}

/** width를 받아 그 width를 초과하는 텍스트가 입력될 시
 * 말줄임으로 표현해주는 함수입니다.
 * */
export function EllipsisCase(props: {
  text: ReactNode;
  testAlign: "center" | "left" | "right";
  className?: string;
  width: number;
  func?: () => void;
}) {
  const { text, className, width, testAlign, func } = props;

  return (
    <TextCase className={className} onClick={func}>
      <Text textAlign={testAlign} width={width}>
        {text}
      </Text>
    </TextCase>
  );
}

export const TextCase = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.span<{ width?: number; textAlign: string }>(
  ({ width, textAlign }) => css`
    text-align: ${textAlign};
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    width: ${width}vw;
  `,
);

/* LIST CONTAINER LAYOUTS -- START */
export function viewSelector<T>(
  theme: Theme,
  windowWidth: number,
  itemWidthList: T[],
  viewLength: number,
  viewPort?: number,
) {
  let width: number;

  if (windowWidth <= theme.windowSize.HD) {
    width = windowWidth - 100;
  } else if (itemWidthList.length > viewLength) {
    width = _.sum(itemWidthList.slice(0, viewLength));
  } else {
    width = viewPort ?? theme.windowSize.HD + 300;
  }
  return width;
}

export const ExhibitionContainer = styled.div<{
  width: number;
  activeScroll: boolean;
}>(
  ({ width, activeScroll }) => css`
    width: ${width}px;
    overflow-x: ${activeScroll ? "scroll" : "hidden"};
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
  `,
);

export const MainTitleLine = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  
  font-family: ${theme.mode.font.component.title};
  }
`,
);

export const MainTitle = styled.h2<{ theme: Theme }>(
  ({ theme }) => css`
    font-family: ${theme.mode.font.component.title};
    color: ${theme.mode.textPrimary};
    cursor: pointer;
  `,
);

export const ControlBox = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: 4px;

    button {
      margin: 0;
      padding: 0;
      width: 45px;
      height: 35px;
      background-position: center;
      transition: background 0.8s;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &:active {
        background-color: ${theme.mode.buttonActiveBackground};
        background-size: 100%;
        transition: background 0s;
      }
    }
    svg {
      width: 20px;
    }
  `,
);

export const ItemContainer = styled(Container)<{
  theme: Theme;
  activeScroll?: boolean;
  gap: number;
  height?: number;
}>(
  ({ theme, activeScroll, gap, height }) => css`
    width: 100%;
    height: ${height ? `${height}px` : "100%"};
    flex-direction: row;
    flex-wrap: ${activeScroll ? "nowrap" : "wrap"};
    justify-content: flex-start;
    align-items: center;

    box-sizing: border-box;
    position: relative;
    gap: ${gap}px;

    @media ${theme.deviceSize.phone} {
      justify-content: ${activeScroll ? "flex-start" : "center"};
    }

    @media ${theme.deviceSize.tablet} {
      justify-content: ${activeScroll ? "flex-start" : "center"};
    }
  `,
);

export const ItemCase = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Item = styled.div<{
  theme: Theme;
  width: number;
  height?: number;
}>(
  ({ theme, width, height }) => css`
    max-width: ${width}px;
    min-width: ${width}px;
    height: ${height ? `${height}px` : "100%"};
    border-radius: ${theme.borderRadius.roundedBox};
    background-color: ${theme.mode.cardBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all 0.3s ease-in-out;
    scroll-snap-align: start;
    overflow: hidden;

    &:hover {
      box-shadow: 2px 4px 16px ${theme.mode.contentBackground};
      transform: scale3d(1.02, 1.02, 1.02);
      //animation: tilt-shaking 0.3s infinite;
    }

    @keyframes tilt-shaking {
      0% {
        transform: rotate(0deg);
      }
      25% {
        transform: rotate(2deg);
      }
      50% {
        transform: rotate(0deg);
      }
      75% {
        transform: rotate(-2deg);
      }
      100% {
        transform: rotate(0deg);
      }
    }
  `,
);

export const DescriptionLine = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: nowrap;
`;

export const ItemTitle = styled.h4<{ theme: Theme }>(
  ({ theme }) => css`
    color: ${theme.mode.textPrimary};
    text-transform: uppercase;
    font-family: ${theme.mode.font.component.title};
    margin-top: 10px;
    margin-bottom: 0;
    cursor: pointer;
  `,
);

export const IFrameCase = styled.iframe<{ width: number; height: number }>(
  ({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;
    border: none;
  `,
);

/* LIST CONTAINER LAYOUTS -- END */
