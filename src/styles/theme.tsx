import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      title: string,
      text: string,
      textBold: string,
      textHighlighted: string,
      textButton: string,
      bgWhite: string,
      bgBeige: string,
      bgPink: string,
      bgPurple: string,
      beige: string,
      blue: string,
      grey: string,
      orange: string,
      pink: string,
      purple: string,
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
    bgWhite: '#ffffff',
    bgBeige: '#fbf1e6',
    bgPink: '#fddbe2',
    bgPurple: '#d3d4ed',
    beige: '#ffdbb4',
    blue: '#9fd8e5',
    grey: '#404756',
    orange: '#ff8961',
    pink: '#f7859c',
    purple: '#9093d1'
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
    text: '18px'
  }
};

export default defaultTheme;
