import styled from 'styled-components';

interface MessageProps {
  active?: boolean,
}

const Message = styled.div<MessageProps>`
  position: fixed;
  top: 120px;
  text-align: center; 
  width: 360px;
  color: ${(props) => (props.active ? props.theme.colors.pink : props.theme.colors.purple)};
`;

export default Message;
