import React, { ChangeEvent, ReactNode } from 'react';
import { Select, Option } from '@material-tailwind/react';
import styles from '../styles.module.scss';

export type SelectorProps = {
  label: string;
  choices: string[];
  selected: { name?: string | undefined; value: unknown } | undefined;
  setSelected: (name: string) => void;
};

export const StyledSelector: React.FC<SelectorProps> = ({
  label: label,
  choices: choices,
  selected: selected,
  setSelected: setSelected,
}) => {
  const handleChange = (value: ReactNode) => {
    setSelected(value as string);
  };
  return (
    <form>
      <label htmlFor={label}>{label}</label>
      <Select className={styles.Selector} value={selected?.value as string} onChange={handleChange}>
        <Option key="1" value="1">
          {' '}
        </Option>
        {choices.map(name => (
          <Option key={name} value={name}>
            {name}
          </Option>
        ))}
      </Select>
    </form>
  );
};
