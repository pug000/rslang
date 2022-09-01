import React from 'react';

import {
  LoadingRing,
  LoadingText
} from './Loader.style';

function Loader() {
  return (
    <LoadingRing>
      <LoadingText>Загрузка...</LoadingText>
    </LoadingRing>
  );
}

export default Loader;
