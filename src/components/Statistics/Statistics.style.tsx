import styled from 'styled-components';

const StatisticsTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.title};
  font-size: ${(props) => props.theme.fontSizes.h3};
  text-align: center;
  margin-bottom: 20px;
`;

const GameCharts = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;

  .coloredText {
    color: ${(props) => props.theme.colors.title};
    padding-left: 20px;
  }
`;

const TotalCharts = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px
`;

const TotalChartsText = styled.p`
  width: 280px;
  margin-top: 50px
`;

const HighlightedText = styled.span`
  color: ${(props) => props.theme.colors.primaryColor};
  font-weight: 700;
`;

export {
  StatisticsTitle,
  GameCharts,
  TotalCharts,
  TotalChartsText,
  HighlightedText
};
