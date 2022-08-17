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
  background-color: #ffffff;
}

#root {
  color: #404756;
}
`;

export default Global;
