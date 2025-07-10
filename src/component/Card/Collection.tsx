/** @jsxImportSource @emotion/react */
import { css, Theme } from "@emotion/react";
import styled from "@emotion/styled";
import { RefObject } from "react";

export interface collectionContentsType {
  image: string;
  title: string;
  description: string;
  detail: { image?: string; color?: string[]; detailContents: string };
}

export function Collection(props: {
  ref: RefObject<HTMLDivElement | null>;
  collectionContents: collectionContentsType;
  theme: Theme;
  isWhite?: boolean;
}) {
  const { ref, collectionContents, theme, isWhite = false } = props;

  return (
    <>
      <CollectionWrapper theme={theme} ref={ref}>
        <ImageCase imageUrl={collectionContents.image} theme={theme} />
        <InfoLine isWhite={isWhite}>
          <Title>{collectionContents.title}</Title>
          <div>
            {collectionContents.description.split("\n").map((line, index) => (
              <Description key={index}>
                {line} <br />
              </Description>
            ))}
          </div>
        </InfoLine>
      </CollectionWrapper>
    </>
  );
}

const CollectionWrapper = styled.article<{ theme: Theme }>(
  ({ theme }) => css`
    width: 350px;
    height: 70vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    scroll-snap-align: center;
    font-family: ${theme.mode.font.banner.collection.title};
    flex-shrink: 0;
  `,
);

const ImageCase = styled.div<{ theme: Theme; imageUrl: string }>(
  ({ imageUrl }) => css`
    width: 100%;
    height: 100%;
    background-image: url(${imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 25px;

    scroll-snap-align: start;
    overflow: hidden;

    transition: transform 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
    transform: scale(1);

    &:hover {
      transform: scale(1.03);
    }
  `,
);

const InfoLine = styled.div<{ isWhite: boolean }>(
  ({ isWhite }) => css`
    position: absolute;
    top: 0;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 1vh;
    color: ${isWhite ? "#000000" : "#ffffff"};
  `,
);

const Title = styled.span`
  font-size: 18px;
`;

const Description = styled.span`
  font-size: 24px;
`;
