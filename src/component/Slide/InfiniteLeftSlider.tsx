/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";
import { css, Theme, useTheme } from "@emotion/react";

export interface InfiniteLeftSliderProps {
  rowList: row[];
  width: number;
  containerSize: { itemWidth: number; height: number; imageWidth: number };
  speed?: number;
  className?: string;
}

interface row {
  name: string;
  image: string;
}

/** 왼쪽으로 무한하게 자동 이동하는 슬라이드입니다.
 *
 * rowList: row[] {name : string, image : string} 을 받아 전체 사이즈와 containerSize에 맞게
 * 컨테이너를 그려 사이즈 규격을 잡아야합니다.
 *
 * containerSize 의 item Width 는 gap을 포함한 크기입니다.
 * image의 넓이는 imageWidth를 통해 조절합니다.
 *
 * speed : number 는 이동 속도를 조절합니다.
 *
 * 사이즈 비율은 2/1 입니다.
 * */
export function InfiniteLeftSlider(props: InfiniteLeftSliderProps) {
  const { rowList, width, containerSize, className, speed = 2 } = props;
  const { itemWidth, height, imageWidth } = containerSize;

  const offsetRef = useRef(0);
  const [speedControl, setSpeedControl] = useState<number>(speed);

  const listRef = useRef<List | null>(null); // ✅ useRef 타입 수정

  useEffect(() => {
    const interval = setInterval(() => {
      offsetRef.current += speedControl;
      listRef.current?.scrollTo(offsetRef.current); // ✅ 호출
    }, 30);

    return () => clearInterval(interval);
  }, [speedControl]);

  return (
    <article
      onMouseOver={() => setSpeedControl(1)}
      onMouseLeave={() => setSpeedControl(speed)}
      css={css`
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
          display: none;
        }
      `}
    >
      <StyledList
        ref={listRef}
        height={height} // ✅ 컨테이너 높이
        width={width} // ✅ 화면 전체 너비 사용
        itemCount={Infinity} // ✅ 무한 개수처럼 보이게 설정
        itemSize={itemWidth} // ✅ 각 아이템 크기
        layout="horizontal" // ✅ 가로 방향 스크롤
        className={className}
      >
        {({ index, style }) => (
          <Row
            index={index}
            style={style}
            rowList={rowList}
            imageWidth={imageWidth}
            height={height}
          />
        )}
      </StyledList>
    </article>
  );
}

function Row(props: {
  rowList: row[];
  index: number;
  style: CSSProperties;
  imageWidth: number;
  height: number;
}) {
  const { rowList, index, style, imageWidth, height } = props;

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const theme = useTheme();

  return (
    <SlideBox
      style={style}
      width={imageWidth}
      height={height}
      onMouseOver={() => setSelectedIndex(index)}
      onMouseLeave={() => setSelectedIndex(null)}
    >
      <StyledImage
        theme={theme}
        src={rowList[index % rowList.length].image}
        alt=""
        width={imageWidth}
        hover={index === selectedIndex}
      />
      {index === selectedIndex && (
        <HoverCase className="hover fill">
          <ButtonCase aria-hidden="true">지금 시청하기</ButtonCase>
        </HoverCase>
      )}
    </SlideBox>
  );
}

const HoverCase = styled.div`
  position: absolute;

  font-size: 12px;
`;

const ButtonCase = styled.span`
  line-height: 1.5714285714;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  min-width: 28px;
  border-radius: 980px;
  letter-spacing: -0.022em;
  padding: 12px 22px;
  font-size: 14px;
  font-weight: 800;
  background-color: #fff;
  color: #1d1d1f;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-70% + 15px));
  margin-bottom: 0;
  transition: transform 0.4s;
`;

const StyledList = styled(List)`
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const SlideBox = styled.div<{ width: number; height: number }>(
  ({ width, height }) => css`
    width: ${width}px;
    height: ${height}px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
  `,
);

const StyledImage = styled.img<{ theme: Theme; width: number; hover: boolean }>(
  ({ theme, width, hover }) => css`
    width: ${width}px;
    object-fit: contain;
    object-position: center;
    border-radius: ${theme.borderRadius.softBox};

    transition: all 0.2s ease-in-out;

    opacity: ${hover ? 0.3 : 1};

    &:hover {
      opacity: 0.3;
    }
  `,
);
