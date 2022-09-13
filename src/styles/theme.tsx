import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      title: string,
      text: string,
      textBold: string,
      textHighlighted: string,
      textButton: string,
      backgroundWhite: string,
      backgroundBeige: string,
      backgroundPink: string,
      backgroundPurple: string,
      backgroundBlue: string,
      beige: string,
      blue: string,
      grey: string,
      orange: string,
      pink: string,
      purple: string,
      primaryColor: string
    }
    fonts: {
      title: string,
      text: string,
    }
    fontSizes: {
      h1: string,
      h2: string,
      h3: string,
      h4: string,
      h5: string,
      text: string,
      smallText: string,
    }
    effects: {
      transition: string,
      hoverOpacity: string,
      hoverTransform: string
    }
  }
}

const defaultTheme: DefaultTheme = {
  colors: {
    title: '#222222',
    text: '#404756',
    textBold: '#222222',
    textHighlighted: '#f7859c',
    textButton: '#ffffff',
    backgroundWhite: '#ffffff',
    backgroundBeige: '#fbf1e6',
    backgroundPink: '#ffe6eb',
    backgroundPurple: '#d3d4ed',
    backgroundBlue: '#dff4f9',
    beige: '#ffdbb4',
    blue: '#9fd8e5',
    grey: '#404756',
    orange: '#ff8961',
    pink: '#f7859c',
    purple: '#888bce',
    primaryColor: '#888bce'
  },
  fonts: {
    title: 'Montserrat, sans-serif',
    text: 'Open Sans, sans-serif'
  },
  fontSizes: {
    h1: '97px',
    h2: '65px',
    h3: '36px',
    h4: '24px',
    h5: '18px',
    text: '18px',
    smallText: '14px',
  },
  effects: {
    transition: 'all 0.2s ease-out',
    hoverOpacity: '0.6',
    hoverTransform: 'scale(1.2)'
  }
};

export default defaultTheme;
