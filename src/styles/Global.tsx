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
  background-color: ${defaultTheme.colors.backgroundWhite};
  font-family: ${defaultTheme.fonts.text};
}

main {
  padding-left: 70px;
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

b {
  font-weight: 700;
}

#root {
  color: ${defaultTheme.colors.grey};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
`;

export default Global;
