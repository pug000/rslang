import { createGlobalStyle } from 'styled-components';

const Global = createGlobalStyle`
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #dad1d1;
}

#root {
  color: #000;
}
`;

export default Global;
