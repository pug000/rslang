import { DefaultTheme } from 'styled-components';

export interface Theme extends DefaultTheme {
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
