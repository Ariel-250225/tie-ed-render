import { Dispatch, ReactNode, SetStateAction, useRef } from "react";
import gsap from "gsap-trial";
import { Flip } from "gsap-trial/Flip";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

gsap.registerPlugin(Flip);

/**
 * React Node를 받아 각 노드가 플립으로 동작하게 하는 컴포넌트입니다.
 * 1. ReactNode[]의 length가 4 이상 일때 사용을 권장합니다.
 * 2. FilpBox가 차지할 최대 크기를 함께 전달해야합니다.
 * 이 최대 크기는 각 노드들의 크기에도 관여하기 때문에 레이아웃을 고려하여 전달해야합니다.
 */
export function FlipBox(props: {
  nodeList: ReactNode[];
  maxWidth: number;
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
}) {
  const { nodeList, maxWidth, selectedIndex, setSelectedIndex } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const prevSelected = useRef<number | null>(null);

  const handleClick = (index: number) => {
    if (!containerRef.current) return;
    if (index === selectedIndex) return; // 자기 자신이면 무시

    const state = Flip.getState(containerRef.current.children);
    prevSelected.current = selectedIndex;
    setSelectedIndex(index);

    requestAnimationFrame(() => {
      Flip.from(state, {
        duration: 1,
        ease: "expo.out",
        absolute: true,
      });
    });
  };
  const gridCount = (nodeList.length - 1) * 2;

  return (
    <FlipContainer ref={containerRef} length={gridCount} maxWidth={maxWidth}>
      {nodeList.map((node, index) => {
        const isActive = index === selectedIndex;
        const isInactive = index !== selectedIndex;

        return (
          <FlipCard
            key={index}
            isActive={isActive}
            isInactive={isInactive}
            length={gridCount}
            onClick={() => handleClick(index)}
            maxWidth={maxWidth}
          >
            {node}
          </FlipCard>
        );
      })}
    </FlipContainer>
  );
}

const FlipContainer = styled.article<{ length: number; maxWidth: number }>(
  ({ length, maxWidth }) => css`
    width: 100%;
    max-width: ${maxWidth}px;
    display: grid;
    grid-gap: 0.5vw;
    margin: 0 auto;
    grid-template-columns: repeat(${length}, 1fr);
  `,
);

const FlipCard = styled.div<{
  isActive: boolean;
  isInactive: boolean;
  length: number;
  maxWidth: number;
}>(
  ({ isActive, isInactive, length, maxWidth }) => css`
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
    position: relative;
    padding: 10px;

    ${isInactive &&
    css`
      grid-column: span 2;
      height: 150px;
    `}

    ${isActive &&
    css`
      grid-row: 1;
      grid-column: 1 / span ${length};
      max-width: ${maxWidth}px;
      height: 36vw;
      order: 0;
    `}
  `,
);
