import React, {
  useEffect,
  useState
} from 'react';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';

import { getUserStatistics } from '@/api';

import {
  DataForCharts,
  DataForTotalStatistics
} from '@/ts/interfaces';

import defaultTheme from '@/styles/theme';

import Loader from '@/Loader';

import {
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
} from './Statistics.style';
import BackgroundElement from './StatisticsSvg';

interface StatisticsProps {
  isLoggedIn: boolean,
  token: string,
  userId: string
}

function Statistics({
  isLoggedIn,
  token,
  userId
}: StatisticsProps) {
  const [isStatisticsShown, setIsStatisticsShown] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [date, setDate] = useState<string | null>(null);
  const [dataGameLearnedWords, setDataGameLearnedWords] = useState<DataForCharts[]>([]);
  const [dataPercentCorrectAnswers, setDataPercentCorrectAnswers] = useState<DataForCharts[]>([]);
  const [dataMaxCountCorrectAnswers, setDataMaxCountCorrectAnswers] = useState<DataForCharts[]>([]);
  const [dataTotalStatistics, setDataTotalStatistics] = useState<DataForTotalStatistics[]>([]);
  const [totalCorrectPercent, setTotalCorrectPercent] = useState('');
  const coloredLegend = (value: string) => <span className="coloredText">{value}</span>;

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        setIsLoadingPage(true);
        const data = await getUserStatistics(userId, token);
        const { sprint, audio } = data.optional.games;

        if (sprint.gameLearnedWords
          || audio.gameLearnedWords) {
          setIsStatisticsShown(true);
        }

        setDate(data.optional.date);
        setDataGameLearnedWords([{
          name: 'Новые слова за день',
          sprint: sprint.gameLearnedWords,
          audio: audio.gameLearnedWords
        }]);
        setDataPercentCorrectAnswers([{
          name: 'Процент правильных ответов',
          sprint: sprint.percentCorrectWord,
          audio: audio.percentCorrectWord
        }]);
        setDataMaxCountCorrectAnswers([{
          name: 'Серия правильных ответов',
          sprint: sprint.maxCountCorrectAnswers,
          audio: audio.maxCountCorrectAnswers
        }]);

        const totalWords = audio.gameLearnedWords + sprint.gameLearnedWords;
        const totalCorrectWords = audio.countCorrectAnswers + sprint.countCorrectAnswers;

        setDataTotalStatistics([{
          name: 'Общая дневная статистика',
          total: totalWords,
          correct: totalCorrectWords
        }]);

        const correctPercent = ((totalCorrectWords / totalWords) * 100).toString().substring(0, 4);
        setTotalCorrectPercent(correctPercent);
        setIsLoadingPage(false);
      })();
    }
  }, []);

  if (isStatisticsShown) {
    return (
      <>
        <StatisticsTitle>{`Дневная статистика на ${date}`}</StatisticsTitle>
        <GameCharts>
          <BarChart width={310} height={300} data={dataGameLearnedWords}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend formatter={coloredLegend} />
            <Bar
              name="Спринт"
              dataKey="sprint"
              fill={defaultTheme.colors.backgroundBlue}
              stroke={defaultTheme.colors.text}
            />
            <Bar
              name="Аудиовызов"
              dataKey="audio"
              fill={defaultTheme.colors.backgroundPink}
              stroke={defaultTheme.colors.text}
            />
          </BarChart>
          <BarChart width={310} height={300} data={dataPercentCorrectAnswers}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 100]} />
            <Tooltip />
            <Legend formatter={coloredLegend} />
            <Bar
              name="Спринт"
              dataKey="sprint"
              fill={defaultTheme.colors.backgroundBlue}
              stroke={defaultTheme.colors.text}
            />
            <Bar
              name="Аудиовызов"
              dataKey="audio"
              fill={defaultTheme.colors.backgroundPink}
              stroke={defaultTheme.colors.text}
            />
          </BarChart>
          <BarChart width={310} height={300} data={dataMaxCountCorrectAnswers}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 20]} />
            <Tooltip />
            <Legend formatter={coloredLegend} />
            <Bar
              name="Спринт"
              dataKey="sprint"
              fill={defaultTheme.colors.backgroundBlue}
              stroke={defaultTheme.colors.text}
            />
            <Bar
              name="Аудиовызов"
              dataKey="audio"
              fill={defaultTheme.colors.backgroundPink}
              stroke={defaultTheme.colors.text}
            />
          </BarChart>
        </GameCharts>
        <StatisticsTitle>Общая дневная статистика</StatisticsTitle>
        <TotalCharts>
          <BarChart width={310} height={300} data={dataTotalStatistics}>
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend formatter={coloredLegend} />
            <Bar
              name="Всего новых слов"
              dataKey="total"
              fill={defaultTheme.colors.backgroundPurple}
              stroke={defaultTheme.colors.text}
            />
            <Bar
              name="Всего правильных ответов"
              dataKey="correct"
              fill={defaultTheme.colors.primaryColor}
              stroke={defaultTheme.colors.text}
            />
          </BarChart>
          <TotalChartsText>
            Общая дневная статистика показывает Ваш результат в целом по двум играм.
            Сегодня процент правильных ответов составил
            <HighlightedText>{` ${totalCorrectPercent} %`}</HighlightedText>
          </TotalChartsText>
          <SvgWrapper>
            <BackgroundElement />
          </SvgWrapper>
        </TotalCharts>
      </>
    );
  }
  return (
    <NoStatisticsWrapper>
      <NoStatisticsTitle>Дневная статистика </NoStatisticsTitle>
      {isLoadingPage
        ? (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )
        : (
          <Note>
            Чтобы увидеть статистику, необходимо поиграть в игры.
          </Note>
        )}
    </NoStatisticsWrapper>
  );
}

export default Statistics;
