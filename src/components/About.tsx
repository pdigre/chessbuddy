import React from 'react';
import { Link } from '@mui/material';

export const About: React.FC = () => (
  <div>
    This chess program is open source and available at github.
    <ul>
      <li>
        <Link href="https://github.com/pdigre/chessbuddy" target="_blank" rel="noopener">
          Github pdigre/chessbuddy
        </Link>
      </li>
      <li>
        <Link
          href="https://github.com/pdigre/chessbuddy/wiki/User-guide"
          target="_blank"
          rel="noopener"
        >
          User Guide / instructions
        </Link>
      </li>
    </ul>
  </div>
);
