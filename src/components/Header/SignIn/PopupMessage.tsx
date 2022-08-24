import React from 'react'
import styled from 'styled-components';
const Message = styled.div`
  position: fixed;
  top: 120px;
  text-align: center; 
  width: 360px;
  color: ${(props) => props.theme.colors.pink};
`

interface PopupMessageProp {
  text?: string;
}

const PopupMessage = ({ text }: PopupMessageProp) => {
  return (
    <Message>{text}</Message>
  )
}

export default PopupMessage
