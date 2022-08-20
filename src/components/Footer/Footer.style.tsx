import defaultTheme from '@/styles/theme';
import styled from 'styled-components';

const FooterWrapper = styled.div`
  width: 100%;
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
  background-color: ${defaultTheme.colors.bgPurple};
`;

const FooterTitleDiv = styled.div`
  padding: 30px 0 20px;
  margin: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid ${defaultTheme.colors.grey};
`;

const FooterTitle = styled.h3`
  font-size: ${defaultTheme.fontSizes.h3};
`;

const SchoolLogo = styled.a`
  display: inline-block;
  width: 145px;
  height: 55px;
  background: url(https://rs.school/images/rs_school_js.svg);
  background-size: cover;
`;

const Copyright = styled.div`
  padding: 20px 0;
  margin: 0 40px;
  display: flex;
  justify-content: space-between;
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
  &:not(:last-child) {
    border-right: 1px solid grey;
    padding-right: 5px;
  }
  &:hover {
    opacity: ${defaultTheme.effects.hoverOpacity};
  }
`;

export {
  FooterWrapper, FooterBorderWrap, FooterContainer, FooterTitleDiv, FooterTitle, SchoolLogo,
  Copyright, Authors, Author
};
