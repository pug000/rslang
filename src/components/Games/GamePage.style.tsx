import defaultTheme from '@/styles/theme';
import styled from 'styled-components';

interface BgProps {
  color: string,
}

interface GroupButtonProps {
  colors: string,
  active: boolean,
}

interface IconProps {
  iconColor: string,
}

const GamePageWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 35px;
  padding-right: 70px;
`;

const BgWrapper = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: -5;
  height: 80%;
`;

const BgGamePageDiv = styled.div<BgProps>`
  background-color: ${(props) => props.color};
  margin-top: -5px;
  height: 100%;
`;

const BgBorderWrapper = styled.div`
  svg {
    width: 100%;
    height: 100%;
  }
`;

const GamePageTitle = styled.h1`
  color: ${defaultTheme.colors.title};
  font-size: ${defaultTheme.fontSizes.h1};
  font-family: ${defaultTheme.fonts.title};
`;

const GamePageText = styled.p`
  font-size: ${defaultTheme.fontSizes.text};
  max-width: 630px;
  text-align: center;
`;

const Group = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  border-radius: 5px;
  gap: 20px;
`;

const GroupBtn = styled.button<GroupButtonProps>`
  width: 55px;
  height: 55px;
  border: 3px solid;
  border-radius: 15%;
  cursor: pointer;
  transition: ${({ theme }) => theme.effects.transition};
  background-color: ${({ colors }) => colors};
  color: ${({ theme }) => theme.colors.bgWhite};
  border-color: ${({ colors }) => colors};

  &:hover {
    opacity: ${({ theme }) => theme.effects.hoverOpacity};  
  }

  ${(props) => props.active && `
    background-color: rgba(255,255,255,0.5);
    color: ${props.colors};
  `}
`;

const GameControlBtns = styled.div`
  display: flex;
  gap: 40px;
`;

const IconWrapper = styled.div<IconProps>`

  svg {
    font-size: 120px;
    color: ${(props) => props.iconColor};
    opacity: 0.2;
  }
`;

const Note = styled.p`
  margin-top: -30px;
  font-size: 14px;
  color: rgba(0,0,0,0.2);
  font-style: italic;
`;

export {
  GamePageWrapper, BgWrapper, BgGamePageDiv, BgBorderWrapper, GamePageTitle, GamePageText,
  Group, GroupBtn, GameControlBtns, IconWrapper, Note
};
