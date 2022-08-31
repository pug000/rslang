import React from 'react';

import { Teammate } from '@/ts/interfaces';

import { projectDescription } from '@/utils/variables';

import {
  AboutUsTitle,
  AboutUsWrapper,
  AboutTeam,
  AboutProject,
  AboutWrapper,
  TeammateIconWrapper,
  TeammateWrapper,
  TeammateLink,
  TeammateRole,
  AboutProjectText,
  AboutProjectTitle
} from './About.style';

import {
  ArtemSvg,
  NastyaSvg,
  RomaSvg
} from './AboutSvg';

function About() {
  const teammates: Teammate[] = [
    {
      id: 1,
      name: 'Роман Трошин',
      icon: <RomaSvg />,
      role: 'Разработчик',
      link: 'https://github.com/pug000'
    },
    {
      id: 2,
      name: 'Анастасия Сачко',
      icon: <NastyaSvg />,
      role: 'Разработчик',
      link: 'https://github.com/saachko'
    },
    {
      id: 3,
      name: 'Артем Харитончик',
      icon: <ArtemSvg />,
      role: 'Разработчик',
      link: 'https://github.com/aArt13'
    },
  ];

  return (
    <AboutWrapper>
      <AboutProject>
        {projectDescription.map((
          {
            id,
            title,
            text,
          }
        ) => (
          <>
            <AboutProjectTitle key={id}>{title}</AboutProjectTitle>
            <AboutProjectText>{text}</AboutProjectText>
          </>
        ))}
      </AboutProject>
      <AboutUsWrapper>
        <AboutUsTitle>Над проектом работали:</AboutUsTitle>
        <AboutTeam>
          {teammates.map((
            {
              id,
              name,
              icon,
              role,
              link
            }
          ) => (
            <TeammateWrapper key={id}>
              <TeammateIconWrapper>
                {icon}
              </TeammateIconWrapper>
              <TeammateLink href={link} target="_blank">
                {name}
              </TeammateLink>
              <TeammateRole>{role}</TeammateRole>
            </TeammateWrapper>
          ))}
        </AboutTeam>
      </AboutUsWrapper>
    </AboutWrapper>
  );
}

export default About;
