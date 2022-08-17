import styled from 'styled-components';

const ButtonElement = styled.button`
  min-width: 8rem;
  height: 3rem;
  padding: 0.3rem;
  font-size: ${(props) => props.theme.fontSizes.h5};
  color: ${(props) => props.theme.colors.textButton};
  font-weight: 700;
  background-color: ${(props) => props.theme.colors.pink};
  border: none;
  border-radius: 0.6rem;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease-out;
  overflow: hidden;

    &:hover{
      opacity: 0.65;
      box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.1);
    }  
    &:disabled{
      background-color: ${(props) => props.theme.colors.grey};
      color: ${(props) => props.theme.colors.textButton};
      opacity: 0.5;
      cursor: auto;
    }
    &:active{
      opacity: 1.0;
    }
`;

export default ButtonElement;
