import React from 'react';
import {
  BgWrapper, BgGamePageDiv, BgBorderWrapper
} from './GamePage.style';

interface BgGamePageProps {
  color: string,
}

function BgGamePageBorder({ color }: BgGamePageProps) {
  return (
    <svg width="1440" height="137" viewBox="0 0 1440 135" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_1_300)">
        <path d="M-423.855 -87L-372.067 -69.0775C-320.278 -51.825 -216.701 -14.975 -113.124 29.0775C-9.5462 73.8 94.0311 127.4 197.608 127.4C301.186 127.4 404.763 73.8 508.34 55.8775C611.918 38.625 715.495 55.375 819.072 73.8C922.65 92.225 1026.23 108.975 1129.8 82.6775C1233.38 55.375 1336.96 -14.975 1440.54 11.3225C1544.11 38.625 1647.69 162.575 1751.27 189.878C1854.85 216.175 1958.42 145.825 2010.21 109.477L2062 73.8V449H2010.21C1958.42 449 1854.85 449 1751.27 449C1647.69 449 1544.11 449 1440.54 449C1336.96 449 1233.38 449 1129.8 449C1026.23 449 922.65 449 819.072 449C715.495 449 611.918 449 508.34 449C404.763 449 301.186 449 197.608 449C94.0311 449 -9.5462 449 -113.124 449C-216.701 449 -320.278 449 -372.067 449H-423.855V-87Z" fill={color} />
        <path d="M1436 136.489H0V398.22H1436V136.489Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_1_300">
          <rect width="1440" height="137" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function GamePageBg({ color }: BgGamePageProps) {
  return (
    <BgWrapper>
      <BgBorderWrapper>
        <BgGamePageBorder color={color} />
      </BgBorderWrapper>
      <BgGamePageDiv color={color} />
    </BgWrapper>
  );
}

export default GamePageBg;
