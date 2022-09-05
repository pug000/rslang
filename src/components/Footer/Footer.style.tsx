import styled from 'styled-components';
import defaultTheme from '@/styles/theme';

const FooterWrapper = styled.div`
  width: 100%;
  z-index: 25;
`;

const FooterBorderWrap = styled.div`
  margin-bottom: -5px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const FooterContainer = styled.div`
  min-height: 170px;
  width: 100%;
  background-color: ${defaultTheme.colors.backgroundPurple};
`;

const FooterTitleDiv = styled.div`
  padding: 30px 0 20px;
  margin: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid ${defaultTheme.colors.grey};

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 10px;
    align-items: flex-start;
  }
`;

const FooterTitle = styled.h3`
  font-size: ${defaultTheme.fontSizes.h3};

  @media (max-width: 670px) {
    font-size: ${defaultTheme.fontSizes.h4};
  }

  @media (max-width: 400px) {
    font-size: ${defaultTheme.fontSizes.h5};
  }
`;

const SchoolLogo = styled.a`
  display: inline-block;
  width: 145px;
  height: 55px;
  background: url(https://rs.school/images/rs_school_js.svg);
  background-size: cover;

  @media (max-width: 670px) {
    width: 108px;
    height: 40px;
  }
`;

const Copyright = styled.div`
  padding: 20px 0;
  margin: 0 40px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 546px) {
    font-size: ${defaultTheme.fontSizes.smallText};
  }

  @media (max-width: 400px) {
    font-size: 12px;
  }
`;

const Authors = styled.div`
  display: flex;
  gap: 5px;
`;

const Author = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${defaultTheme.colors.text};
  transition: ${defaultTheme.effects.transition};
  padding-right: 5px;
  &:not(:last-child) {
    border-right: 1px solid grey;
  }
  &:hover {
    opacity: ${defaultTheme.effects.hoverOpacity};
  }
`;

export {
  FooterWrapper,
  FooterBorderWrap,
  FooterContainer,
  FooterTitleDiv,
  FooterTitle,
  SchoolLogo,
  Copyright,
  Authors,
  Author
};
