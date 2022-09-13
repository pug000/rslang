import styled from 'styled-components';

const InputWrapper = styled.div`
  margin-bottom: 1rem;
  font-family: ${(props) => props.theme.fonts.text};
`;

const InputField = styled.input`
  width: 15rem;
  height: 2.5rem;
  padding: 0.4rem;
  color: ${(props) => props.theme.colors.grey};
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-weight: 400;
  border-radius: 0.6rem;
  border: solid 0.2rem ${(props) => props.theme.colors.grey};
  opacity: 0.9;
  outline: none;
  transition: ${(props) => props.theme.effects.transition};

  ::placeholder{
    font-size: calc(${(props) => props.theme.fontSizes.h5} * 0.8);
  }
  &:focus, &:hover{
    opacity: ${(props) => props.theme.effects.hoverOpacity};
    border: solid 0.2rem ${(props) => props.theme.colors.primaryColor};
    box-shadow: 0px 10px 13px rgba(0, 0, 0, 0.07);
  }
`;

const Label = styled.label`
  width: 15rem;
  display: flex;
  flex-direction: column;
`;

const TitleLabel = styled.p`
  font-weight: 500;
  color: ${(props) => props.theme.colors.grey};
  font-size: ${(props) => props.theme.fontSizes.h4};
  margin-bottom: 0.2rem;
`;

export {
  TitleLabel,
  Label,
  InputField,
  InputWrapper
};
