import React from 'react';

import { ColorProps } from '@/ts/interfaces';

function BackgroundElement({ $color }: ColorProps) {
  return (
    <svg width="78" height="80" viewBox="0 0 78 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M70.1152 23.9444C75.0978 31.1361 78.6064 40.1459 77.086 48.2776C75.609 56.4273 69.1028 63.6988 61.4548 69.6844C53.8069 75.67 45.01 80.2652 37.3183 78.937C29.6446 77.5655 23.0687 70.1664 16.5616 63.4545C10.0725 56.6994 3.60872 50.6136 1.28515 42.9078C-0.995063 35.2201 0.882968 25.8694 5.50681 17.8647C10.1054 9.7988 17.4497 3.07898 25.6832 1.28895C33.9601 -0.482983 43.126 2.67496 50.8974 6.97488C58.7122 11.2928 65.1327 16.7527 70.1152 23.9444Z" fill={$color} />
    </svg>
  );
}

export default BackgroundElement;
