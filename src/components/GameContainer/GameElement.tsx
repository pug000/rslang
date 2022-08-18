import React from 'react'
import styled from 'styled-components';

interface GameElementProps {
  title: string;
}

const GameElement = ({ title }: GameElementProps) => {
  return (
    <div>
      <h3>{title}</h3>
    </div>
  )
}

export default GameElement
