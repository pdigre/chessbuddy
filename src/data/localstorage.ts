import React from 'react';

export const useLocalStorage: (
  key: string,
  defaultValue: string
) => [string, React.Dispatch<React.SetStateAction<string>>] = (key, defaultValue) => {
  const [state, setState] = React.useState(localStorage.getItem(key) || defaultValue);
  React.useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);
  return [state, setState];
};
