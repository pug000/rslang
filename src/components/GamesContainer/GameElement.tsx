import React from 'react'
import styled from 'styled-components';

const GameContainer = styled.div`
  width: 20rem;
  min-height: 35rem;
  color: ${(props) => props.theme.colors.grey};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0.6rem;
  border: solid 0.2rem ${(props) => props.theme.colors.grey};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-out;

  &:hover{
    border: solid 0.2rem ${(props) => props.theme.colors.pink};
    box-shadow: 0px 20px 35px rgba(0, 0, 0, 0.06);
    transform: scale(1.05);
  }
  &:hover h3{
    color: ${(props) => props.theme.colors.pink};
  }
`
const TitleGame = styled.h3`
  font-size: ${(props) => props.theme.fontSizes.h3};
  text-decoration: none;
  transition: all 0.2s ease-out;
`
interface GameElementProps {
  title: string;
}

const GameElement = ({ title }: GameElementProps) => {
  return (
    <GameContainer>
      <TitleGame>{title}</TitleGame>
    </GameContainer>
  )
}

export default GameElement
