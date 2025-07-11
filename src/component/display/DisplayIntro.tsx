/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css, Theme, useTheme } from "@emotion/react";
import { FuncItem } from "../styled/Button/Button";
import { Fragment, useEffect, useRef, useState } from "react";

import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { useWindowContext } from "../../context/WindowContext";
import { FlipBox } from "../Card/Flip";
import { useWindowResponsiveHeight } from "../../hooks/useWindowHooks";

const IMAGE_LIST = [
  "/assets/image/inner_casino.jpg",
  "/assets/image/casino_lounge.jpg",
  "/assets/image/poker.jpg",
  "/assets/image/red_casino.jpg",
  "/assets/image/poker_light.jpg",
];

const VIDEO_SRC = "/assets/video/poker_video.mp4";

export function DisplayIntro() {
  const theme = useTheme();

  const [videoShownIndex, setVideoShownIndex] = useState<number | null>(0);
  const [videoFadingOut, setVideoFadingOut] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const flipRef = useRef<HTMLDivElement>(null);

  const { windowWidth } = useWindowContext();

  const responsiveHeight = useWindowResponsiveHeight(0.36501, 189.993);

  useEffect(() => {
    setVideoShownIndex(selectedIndex);
    setVideoFadingOut(false);

    const timer = setTimeout(() => {
      setVideoFadingOut(true); // fade 시작

      // fade 시간 후 비디오 제거
      setTimeout(() => {
        setVideoShownIndex(null);
        setVideoFadingOut(false);
      }, 800); // <- transition 시간과 동일
    }, 5000);

    return () => clearTimeout(timer); // index 바뀌면 기존 타이머 정리
  }, [selectedIndex, windowWidth]);

  const childrenList = IMAGE_LIST.map((image, index) => (
    <Fragment key={index}>
      <div
        css={css`
          width: 100%;
          max-width: ${windowWidth}px;
          height: 100%;
          isolation: isolate;
        `}
      >
        {selectedIndex === index || videoShownIndex === index ? (
          <>
            <div
              css={css`
                position: absolute;
                top: 10%;
                left: 6%;
                display: flex;
                flex-direction: row;
                align-items: flex-start;
                justify-content: flex-start;
                z-index: 2;
              `}
            >
              <img
                css={css`
                  width: 12vw;
                  height: 5vh;
                  filter: invert(100%);
                `}
                src="https://www.evolution.com/wp-content/themes/evolution-wp/assets/img/evolution_logo.svg"
                alt="logo"
              />
            </div>
            <div
              css={css`
                position: absolute;
                bottom: 24%;
                left: 6%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: flex-start;
                color: #ffffff;
                gap: 1vh;
                z-index: 2;
              `}
            >
              <Title theme={theme}>EVOLUTION GAMING</Title>
              <Description theme={theme}>
                A Evolution gaming is most famous Live Casino provider in the
                World
                <br />
                <br />
                This casino, with its player-focused gaming tables,
                <br />
                will offer you an ecstatic day.
                <br />
                <br />
                Ready to find your ecstasy at this casino?
              </Description>
            </div>
            <div
              css={css`
                position: absolute;
                bottom: 10%;
                left: 6%;

                display: flex;
                flex-direction: column;
                gap: 1vh;
                z-index: 2;
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex-direction: row;
                  justify-content: center;
                  align-content: center;
                  gap: 1vw;
                `}
              >
                <StyledButton
                  label="DEMO"
                  func={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  backgroundColor={theme.mode.buttonIsActiveBackground}
                  color="#ffffff"
                />
                <StyledButton
                  startIcon={<PlayCircleIcon />}
                  label="PLAY"
                  func={function (): void {
                    throw new Error("Function not implemented.");
                  }}
                  backgroundColor={theme.mode.buttonActiveBackground}
                  color="#ffffff"
                />
              </div>
            </div>
          </>
        ) : null}
        {videoShownIndex === index && (
          <video
            autoPlay
            playsInline
            muted
            loop
            src={VIDEO_SRC}
            css={css`
              position: absolute;
              width: 100%;
              height: 100%;
              object-fit: cover;
              transition: opacity 0.8s ease-in-out;
              opacity: ${videoFadingOut ? 0 : 1};
              pointer-events: none;
            `}
          />
        )}

        {/* 이미지 */}
        <ImageCase
          imageUrl={image}
          theme={theme}
          isActive={index === selectedIndex}
          css={css`
            max-width: ${windowWidth}px;
            width: 100%;
            height: 100%;
          `}
        />
      </div>
    </Fragment>
  ));

  return (
    <>
      <FlipContainer ref={flipRef} height={responsiveHeight}>
        <FlipBox
          nodeList={childrenList}
          maxWidth={windowWidth}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      </FlipContainer>
    </>
  );
}

const FlipContainer = styled.div<{ height: number }>(
  ({ height }) => css`
    width: 100%;
    height: ${height}px;
    justify-content: flex-start;
    position: relative;
    overflow: visible;
  `,
);

const Title = styled.span<{ theme: Theme }>(
  ({ theme }) => css`
    font-size: 2.4em;
    font-family: ${theme.mode.font.component.title};
    font-weight: 600;
  `,
);

const Description = styled.span<{ theme: Theme }>(
  ({ theme }) => css`
    font-size: 1.1em;
    font-family: ${theme.mode.font.component.description};
    font-weight: 500;
  `,
);

const ImageCase = styled.div<{
  theme: Theme;
  imageUrl: string;
  isActive: boolean;
}>(
  ({ theme, imageUrl, isActive }) => css`
    height: 100%;
    background-image: ${isActive
      ? `linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%), url(${imageUrl})`
      : `url(${imageUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: ${theme.borderRadius.softBox};
  `,
);

const StyledButton = styled(FuncItem, {
  shouldForwardProp: (prop) => !["backgroundColor", "color"].includes(prop),
})<{
  backgroundColor: string;
  color: string;
}>(
  ({ backgroundColor, color }) => css`
    flex-shrink: 0;
    padding-right: 2.4rem;
    padding-left: 2rem;
    font-size: 1vw;
    background: ${backgroundColor};
    color: ${color};
  `,
);
