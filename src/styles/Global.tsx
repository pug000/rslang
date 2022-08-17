import { createGlobalStyle } from 'styled-components';
import defaultTheme from './theme';

const Global = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-weight: 400;
}

body {
  background-color: ${defaultTheme.colors.bgWhite};
  font-family: ${defaultTheme.fonts.text};
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  font-family: ${defaultTheme.fonts.title};
}

#root {
  color: ${defaultTheme.colors.grey};
}
`;

export default Global;
