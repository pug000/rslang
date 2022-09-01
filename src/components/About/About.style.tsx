import styled from 'styled-components';

import defaultTheme from '@/styles/theme';

const AboutWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5%;
  margin: 0 5%; 
`;

const AboutUsWrapper = styled.section`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const AboutUsTitle = styled.h1`
  color: ${defaultTheme.colors.title};
  text-align: center;
  font-size: ${defaultTheme.fontSizes.h3};
`;

const AboutTeam = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TeammateWrapper = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
`;

const TeammateIconWrapper = styled.div`
  height: 270px;
  position: relative;
  margin-bottom: 4%;

  svg {
    height: 100%;
    position: absolute;
    left: -100px;
    top: 0;
  }
`;

const TeammateLink = styled.a`
  display: block;
  width: 160px;
  text-decoration: none;
  color: ${defaultTheme.colors.text};
  font-size: ${defaultTheme.fontSizes.h4};
  transition: ${defaultTheme.effects.transition};

  &:hover {
    opacity: ${defaultTheme.effects.hoverOpacity};
  }
`;

const TeammateRole = styled.p`
  opacity: 0.5;
  font-size: 15px;
  font-style: italic;
`;

const AboutProject = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AboutProjectWrapper = styled.div`
  &:not(:last-of-type) {
    border-bottom: 1px solid ${defaultTheme.colors.grey};
    margin-bottom: 4%;
    padding-bottom: 4%;
  }
`;

const AboutProjectTitle = styled.h3`
  color: ${defaultTheme.colors.title};
  font-size: ${defaultTheme.fontSizes.h5};
  text-align: left;
  align-self: flex-start;
`;

const AboutProjectText = styled.p`
  margin: 0 auto;
`;

export {
  AboutWrapper,
  AboutUsWrapper,
  AboutUsTitle,
  AboutTeam,
  TeammateWrapper,
  TeammateIconWrapper,
  TeammateLink,
  TeammateRole,
  AboutProject,
  AboutProjectText,
  AboutProjectTitle,
  AboutProjectWrapper,
};
