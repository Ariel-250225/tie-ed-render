/** @jsxImportSource @emotion/react */
import { Collection, collectionContentsType } from "../Card/Collection";

import napoliPlayer from "../../assets/image/sport/napoli_player.avif";
import iCoinLogo from "../../assets/image/iCoinVertical.avif";
import liveCasino from "../../assets/image/game/liveCasinoVertical.avif";
import liveSports from "../../assets/image/sport/soccer.avif";
import liveESports from "../../assets/image/sport/esports.avif";
import napoliLogo from "../../assets/image/news/global_news_2.avif";
import security from "../../assets/image/security.avif";
import { css, useTheme } from "@emotion/react";
import { Fragment, RefObject } from "react";

export function AdCardSection(props: {
  ref: RefObject<HTMLDivElement | null>;
}) {
  const { ref } = props;
  const theme = useTheme();

  const COLLECTION_CONTENTS: collectionContentsType[] = [
    {
      image: napoliPlayer,
      title: "SSC NAPOLI, 공식 파트너",
      description: "최고와 함께하는\n 최고의 서비스",
      detail: {
        image: napoliLogo,
        color: [
          theme.colors.darkCharcoal,
          theme.colors.blueBikini,
          "#ffffff",
          "#ffffff",
        ],
        detailContents:
          "최고의 서비스를 제공하기 위해 최고의 팀과 함께합니다.\n\n" +
          "역대 세리에 A 4회 우승과 UEFA 유로파 리그 1회 우승에 빛나는, 팀 나폴리와의 파트너십으로\n" +
          "우리는 세계로 도약하는 회사로의 첫걸음을 내딛었습니다.",
      },
    },
    {
      image: iCoinLogo,
      title: "암호화폐 플랫폼, I COINS 도입",
      description: "쉽게 넣고, \n 안전하게 받고",
      detail: {
        image: security,
        color: [
          theme.colors.darkCharcoal,
          theme.colors.blueBikini,
          "#ffffff",
          "#ffffff",
        ],
        detailContents:
          "우리는 어떻게 하면 당신의 거래가 안전할지 고민합니다.\n\n" +
          "보내거나 받을 때,\n 비실명 거래로 당신의 개인정보를 보호하고, icoins가 대금결제를 진행하여 거래를 안전하게 지켜주죠.\n\n" +
          "그리고 자체적인 암호화 시스템 덕분에 당신의 거래정보는 오직 거래를 진행하는데에만 사용되며, 결코 공유되지 않습니다.",
      },
    },
    {
      image: liveCasino,
      title: "라이브 카지노",
      description: "현장의 짜릿함을 \n 지금 여기서도",
      detail: {
        color: [
          theme.colors.crimsonRed,
          theme.colors.crimsonRed,
          theme.colors.crimsonRed,
          theme.colors.crimsonRed,
        ],
        detailContents:
          "에볼루션 카지노, 마이크로 게이밍, 아시아 게이밍, 프라그마틱, 드림게이밍, 호텔 카지노까지,\n\n" +
          "카지노를 가지 않아도 온라인에서 카지노의 모든 게임을 무제한으로 방해없이 맘껏 즐길 수 있습니다.\n\n" +
          "그야말로 짜릿한 오락실이 어디서든 펼쳐집니다.",
      },
    },
    {
      image: liveSports,
      title: "라이브 스포츠",
      description: "스포츠 베팅은 \n 단순하고, 간편하게",
      detail: {
        color: [
          theme.colors.blueBikini,
          theme.colors.blueBikini,
          theme.colors.blueBikini,
          theme.colors.blueBikini,
        ],
        detailContents:
          "중요한 순간은 반드시 필요한 것만,\n\n" +
          "쌓아온 운영 노하우로 반드시 필요한 정보와 승리의 짜릿함을 느낄 수 있는 베팅을 준비했습니다.\n" +
          "유저를 만족시키는 경험과 혁신적인 업계 최고의 베팅 서비스를 지금 여기서 느껴보세요.\n",
      },
    },
    {
      image: liveESports,
      title: "라이브 E-스포츠",
      description: "더 좋은 화질로 \n더 높은 배당으로",
      detail: {
        color: [
          theme.colors.blueBikini,
          theme.colors.blueBikini,
          theme.colors.blueBikini,
          theme.colors.blueBikini,
        ],
        detailContents:
          "최고의 즐길거리를 모두 여기에서,\n\n" +
          "BJ 롤, 스타크래프트 BJ 멸망전까지 다른곳에서 발매되지 않는 게임들도 모두 준비했습니다.\n" +
          "실감나는 화질로 경기를 즐기고 더 높은 배당으로 승리의 달콤함을 느껴보세요.",
      },
    },
  ];

  return (
    <>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          justify-content: flex-start;
          align-items: center;
          gap: 20px;
        `}
      >
        {COLLECTION_CONTENTS.map((item) => (
          <Fragment key={item.image}>
            <Collection
              ref={ref}
              collectionContents={item}
              theme={theme}
              isWhite={item.image.includes("iCoin")}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}
