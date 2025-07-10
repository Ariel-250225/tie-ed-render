/** @jsxImportSource @emotion/react */
import { ContentsContainer, PageContainer } from "../component/layouts";
import { DisplayIntro } from "../component/display/DisplayIntro";
import { ThumbnailCard } from "../component/Card/ThumbnailCard";
import styled from "@emotion/styled";
import { Fragment, useRef, useState } from "react";
import { css, Theme, useTheme } from "@emotion/react";
import { InfiniteLeftSlider } from "../component/Slide/InfiniteLeftSlider";
import { useWindowContext } from "../context/WindowContext";
import { BANNER_LIVE_CASINO } from "../component/banner/bannerAssets";
import { AdCardSection } from "../component/banner/AdCardSection";

import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { FuncItem } from "../component/styled/Button/Button";

export function Main() {
  const theme = useTheme();
  const { windowWidth } = useWindowContext();

  const [expanded, setExpanded] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const adCardRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    const container = scrollRef.current;
    const card = adCardRef.current;

    if (!container || !card) return;

    const cardWidth = card.clientWidth;
    const gap = 0;

    container.scrollLeft += cardWidth + gap;
  };

  const scrollPrev = () => {
    const container = scrollRef.current;
    const card = adCardRef.current;

    if (!container || !card) return;

    const cardWidth = card.clientWidth;
    const gap = 10;
    container.scrollLeft -= cardWidth + gap;
  };

  const containerWidth = windowWidth * 0.9;

  return (
    <>
      <DisplayIntro />
      <InfiniteLeftSlider
        rowList={BANNER_LIVE_CASINO}
        width={windowWidth}
        containerSize={{
          itemWidth: 300,
          height: 180,
          imageWidth: 290,
        }}
        speed={2}
      />
      <InfiniteLeftSlider
        rowList={BANNER_LIVE_CASINO}
        width={windowWidth}
        containerSize={{
          itemWidth: 300,
          height: 180,
          imageWidth: 290,
        }}
        speed={2.5}
      />

      <PageContainer width={90}>
        <ContentsTitle
          theme={theme}
          css={css`
            margin: 2% 0 0 0;
            font-size: 2.4vw;
            font-weight: 600;
            font-family: ${theme.mode.font.main.title};
          `}
        >
          OKGO에서 즐기면 더 좋은 이유
        </ContentsTitle>
        <ContentsContainer
          ref={scrollRef}
          css={css`
            width: 100%;
            align-items: flex-start;
            padding: 1% 0;
            box-sizing: border-box;
            margin: 0 10%;

            overflow-x: scroll;
            overflow-y: hidden;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;

            -ms-overflow-style: none;
            &::-webkit-scrollbar {
              display: none;
            }
          `}
        >
          <AdCardSection ref={adCardRef} />
        </ContentsContainer>
        <div
          css={css`
            width: 100%;
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            box-sizing: border-box;
            //padding-right: 4%;
            gap: 1vw;
            z-index: 1;

            svg {
              transition: scale 0.4s ease-in-out;
              &:hover {
                scale: 1.1;
              }
            }
          `}
        >
          <ArrowCircleLeftIcon
            sx={{ width: 40, height: 40 }}
            onClick={scrollPrev}
          />
          <ArrowCircleRightIcon
            sx={{ width: 40, height: 40 }}
            onClick={() => scrollNext()}
          />
        </div>
        <ContentsContainer
          css={css`
            margin-top: 10px;
          `}
        >
          <ContentsTitle theme={theme}>
            당신이 즐기고 싶었던, 모든 카지노
          </ContentsTitle>
          <HorizontalContainer
            expanded={expanded}
            itemHeight={(containerWidth - 12 * 6) / 6}
          >
            {Array.from({ length: 19 }).map((_, i) => (
              <Fragment key={i}>
                <ThumbnailCard
                  width={(containerWidth - 12 * 6) / 6}
                  height={(containerWidth - 12 * 6) / 6}
                />
              </Fragment>
            ))}
          </HorizontalContainer>
          <FuncItem
            label={expanded ? "접기" : "더보기"}
            func={() => setExpanded((prev) => !prev)}
            isActive={expanded}
            css={css`
              margin: 10px 0;
              border-radius: ${theme.borderRadius.softBox};
              background-color: ${theme.mode.buttonBackground};
            `}
          />
        </ContentsContainer>
      </PageContainer>
    </>
  );
}

const ContentsTitle = styled.div<{ theme: Theme }>(
  ({ theme }) => css`
    width: 100%;
    text-align: left;

    margin: 0 0 2% 0;

    font-size: 2.4vw;
    font-weight: 600;
    font-family: ${theme.mode.font.main.title};
  `,
);

const HorizontalContainer = styled.div<{
  expanded: boolean;
  itemHeight: number;
}>(
  ({ expanded, itemHeight }) => css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 12px;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out;
    max-height: ${expanded ? "1000px" : `${itemHeight}px`};
  `,
);
