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
      teammateId: 1,
      name: 'Роман Трошин',
      icon: <RomaSvg />,
      role: 'Разработчик',
      link: 'https://github.com/pug000',
      title: 'Roman on GitHub'
    },
    {
      teammateId: 2,
      name: 'Анастасия Сачко',
      icon: <NastyaSvg />,
      role: 'Разработчик',
      link: 'https://github.com/saachko',
      title: 'Anastasiya on GitHub'
    },
    {
      teammateId: 3,
      name: 'Артем Харитончик',
      icon: <ArtemSvg />,
      role: 'Разработчик',
      link: 'https://github.com/aArt13',
      title: 'Artsiom on GitHub'
    },
  ];

  return (
    <AboutWrapper>
      <AboutProject>
        {projectDescription.map((
          {
            descriptionId,
            title,
            text,
          }
        ) => (
          <div key={descriptionId}>
            <AboutProjectTitle>{title}</AboutProjectTitle>
            <AboutProjectText>{text}</AboutProjectText>
          </div>
        ))}
      </AboutProject>
      <AboutUsWrapper>
        <AboutUsTitle>Над проектом работали:</AboutUsTitle>
        <AboutTeam>
          {teammates.map((
            {
              teammateId,
              name,
              icon,
              role,
              link,
              title
            }
          ) => (
            <TeammateWrapper key={teammateId}>
              <TeammateIconWrapper>
                {icon}
              </TeammateIconWrapper>
              <TeammateLink href={link} title={title} target="_blank">
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
