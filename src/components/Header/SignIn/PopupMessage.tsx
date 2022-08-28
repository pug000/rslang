import React from 'react';
import { Message } from './PopupMessage.style';

interface PopupMessageProp {
  text?: string;
  statusErr?: boolean;
}

function PopupMessage({ text, statusErr }: PopupMessageProp) {
  return (
    <Message active={statusErr}>{text}</Message>
  );
}

PopupMessage.defaultProps = {
  text: '',
};

export default PopupMessage;
