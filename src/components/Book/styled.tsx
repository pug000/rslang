import styled from 'styled-components';

const BookContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding: 0 25px;
`;

const BookTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.title};
  font-size: ${(props) => props.theme.fontSizes.h3};
  color: ${(props) => props.theme.colors.pink};
`;

const BookWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
`;

const BookGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
  border-radius: 5px;
  gap: 10px;
  position: sticky;
  top: 15px;
  box-shadow: 0px 3px 3px 0px rgb(0 0 0 / 20%),
  0px 3px 4px 0px rgb(0 0 0 / 14%),
  0px 1px 8px 0px rgb(0 0 0 / 12%);
`;

const BookGroupTitle = styled.h4`
  color: ${(props) => props.theme.colors.pink};
  font-size: ${(props) => props.theme.fontSizes.text};
`;

const BookGroupBtn = styled.button`
  width: 55px;
  height: 55px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s;
  background-color: ${(props) => props.theme.colors.bgPink};
  color: ${(props) => props.theme.colors.bgWhite};

  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const BookItemsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BookItem = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 10px;
  border-radius: 10px;
  padding: 15px;
`;

const BookItemImg = styled.img`
  width: 300px;
  object-fit: cover;
`;

const BookItemInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 30px;
  gap: 25px;
`;

const BookItemInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const BookItemTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.text};
  color: ${(props) => props.theme.colors.title};
  font-weight: 500;
`;

const BookItemText = styled.div`
  color: ${(props) => props.color ?? props.theme.colors.text};
`;

export {
  BookContainer,
  BookTitle,
  BookWrapper,
  BookGroup,
  BookItemsContainer,
  BookItem,
  BookItemImg,
  BookGroupBtn,
  BookGroupTitle,
  BookItemInfoContainer,
  BookItemTitle,
  BookItemText,
  BookItemInfoWrapper,
};
