/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from 'react';
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

import {
  StatisticsTitle,
  GameCharts,
  TotalCharts,
  TotalChartsText,
  HighlightedText
} from './Statistics.style';

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
  const [date, setDate] = useState<string | null>(null);
  const [dataGameLearnedWords, setDataGameLearnedWords] = useState<DataForCharts[]>([]);
  const [dataPercentCorrectAnswers, setDataPercentCorrectAnswers] = useState<DataForCharts[]>([]);
  const [dataMaxCountCorrectAnswers, setDataMaxCountCorrectAnswers] = useState<DataForCharts[]>([]);
  const [dataTotalStatistics, setDataTotalStatistics] = useState<DataForTotalStatistics[]>([]);
  const [totalCorrectPercent, setTotalCorrectPercent] = useState('');

  if (!isLoggedIn) return null;
  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const data = await getUserStatistics(userId, token);
        setDate(data.optional.date);
        setDataGameLearnedWords([{
          name: 'Новые слова за день',
          sprint: data.optional.games.sprint.gameLearnedWords,
          audio: data.optional.games.audio.gameLearnedWords
        }]);
        setDataPercentCorrectAnswers([{
          name: 'Процент правильных ответов',
          sprint: data.optional.games.sprint.percentCorrectWord,
          audio: data.optional.games.audio.percentCorrectWord
        }]);
        setDataMaxCountCorrectAnswers([{
          name: 'Серия правильных ответов',
          sprint: data.optional.games.sprint.maxCountCorrectAnswers,
          audio: data.optional.games.audio.maxCountCorrectAnswers
        }]);

        const totalWords = data.optional.games.audio.gameLearnedWords + data.optional.games.sprint.gameLearnedWords;
        const totalCorrectWords = data.optional.games.audio.countCorrectAnswers + data.optional.games.sprint.countCorrectAnswers;

        setDataTotalStatistics([{
          name: 'Общая дневная статистика',
          total: totalWords,
          correct: totalCorrectWords
        }]);

        const correctPercent = ((totalCorrectWords / totalWords) * 100).toString().substring(0, 4);
        setTotalCorrectPercent(correctPercent);
      })();
    }
  }, []);

  return (
    <>
      <StatisticsTitle>
        {'Дневная статистика на '}
        {date}
      </StatisticsTitle>
      <GameCharts>
        <BarChart width={310} height={300} data={dataGameLearnedWords}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend formatter={(value) => <span className="coloredText">{value}</span>} />
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
          <Legend />
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
          <YAxis />
          <Tooltip />
          <Legend />
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
          <Legend />
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
      </TotalCharts>
    </>
  );
}

export default Statistics;
