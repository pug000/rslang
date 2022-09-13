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

  @media (max-width: 480px) {
    top: 95px;
    width: 230px;
  }
`;

export default Message;
