import React from 'react';
import './styles.scss';

export interface IHighlightProps {
  isValid: boolean;
  symbol: string;
}

export const Highlight = ({ isValid, symbol }: IHighlightProps): JSX.Element => {
  return <span className={isValid ? 'highlight_green' : 'highlight_red'}>{symbol}</span>;
};
