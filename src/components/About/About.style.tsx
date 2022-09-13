import styled from 'styled-components';

import defaultTheme from '@/styles/theme';

const AboutWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 5%;
  margin: 0 5%; 

  @media (max-width: 915px) {
    flex-direction: column;
    gap: 20px;
    align-items: center;
    margin-top: 20px;
  }
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

  @media (max-width: 615px) {
    font-size: ${defaultTheme.fontSizes.h4};
  }
`;

const AboutTeam = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 30px;

  @media (max-width: 615px) {
    transform: scale(0.8);
  }

  @media (max-width: 500px) {
    transform: scale(0.7);
    margin: -30px 0 -30px;
  }

  @media (max-width: 456px) {
    transform: scale(0.8);
    flex-direction: column;
    gap: 15px;
    margin: -120px 0 -120px -100px;
  }
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

  @media (max-width: 915px) {
    width: 80%;
  }
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
