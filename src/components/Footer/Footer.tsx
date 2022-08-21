import React from 'react';
import {
  FooterWrapper, FooterContainer, FooterBorderWrap, FooterTitleDiv, FooterTitle, SchoolLogo,
  Copyright, Authors, Author
} from './Footer.style';
import FooterBorder from './FooterBorder';

function Footer() {
  return (
    <FooterWrapper>
      <FooterBorderWrap>
        <FooterBorder />
      </FooterBorderWrap>
      <FooterContainer>
        <FooterTitleDiv>
          <FooterTitle>Наша команда на GitHub</FooterTitle>
          <SchoolLogo href="https://rs.school/js/" title="RS school" target="_blank" />
        </FooterTitleDiv>
        <Copyright>
          <Authors>
            <Author href="https://github.com/pug000" title="Roman on GitHub" target="_blank">Роман Трошин</Author>
            <Author href="https://github.com/saachko" title="Anastasiya on GitHub" target="_blank">Анастасия Сачко</Author>
            <Author href="https://github.com/aArt13" title="Artsiom on GitHub" target="_blank">Артем Харитончик</Author>
          </Authors>
          <p>2022</p>
        </Copyright>
      </FooterContainer>
    </FooterWrapper>
  );
}

export default Footer;
