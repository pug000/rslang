import styled from 'styled-components';

const StatisticsTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.title};
  font-size: ${(props) => props.theme.fontSizes.h3};
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 468px) {
    font-size: ${(props) => props.theme.fontSizes.h4};
  }
`;

const GameCharts = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;

  .coloredText {
    color: ${(props) => props.theme.colors.text};
    padding-left: 20px;
  }

  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }

  @media (max-width: 404px) {
    transform: scale(0.8);
    margin: -80px 0 -80px -30px;
  }

  @media (max-width: 340px) {
    transform: scale(0.73);
    margin: -100px 0 -100px -30px;
  }
`;

const TotalCharts = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;

  .coloredText {
    color: ${(props) => props.theme.colors.text};
    position: relative;
    left: 20px;
  }

  @media (max-width: 1024px) {
    flex-wrap: wrap;
  }

  @media (max-width: 404px) {
    transform: scale(0.8);
    margin: -80px 0 -80px -30px;
  }

  @media (max-width: 340px) {
    transform: scale(0.73);
    margin: -100px 0 -100px -30px;
  }
`;

const TotalChartsText = styled.p`
  width: 290px;
  margin-top: 50px;
  text-align: center;
`;

const HighlightedText = styled.span`
  color: ${(props) => props.theme.colors.primaryColor};
  font-weight: 700;
`;

const SvgWrapper = styled.div`
  width: 280px;
  height: 280px;
  margin-left: -40px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const NoStatisticsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 25px;
  padding: 0 25px;
  margin: 0 auto;
  margin-bottom: 40px;
  height: 40vh;
  max-width: 1100px;
`;

const LoaderWrapper = styled.div`
  margin-left: -300px;

  @media (max-width: 468px) {
    padding-left: 90px;
  }
`;

const NoStatisticsTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.title};
  font-size: ${(props) => props.theme.fontSizes.h2};
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 560px) {
    font-size: ${({ theme }) => theme.fontSizes.h3};
  }
`;

const Note = styled.p`
  margin-top: -30px;
  font-size: 14px;
  color: rgba(0,0,0,0.4);
  font-style: italic;
  text-align: center;
  margin: 0 auto;
  max-width: 300px;
`;

export {
  StatisticsTitle,
  GameCharts,
  TotalCharts,
  TotalChartsText,
  HighlightedText,
  SvgWrapper,
  NoStatisticsWrapper,
  LoaderWrapper,
  NoStatisticsTitle,
  Note
};
