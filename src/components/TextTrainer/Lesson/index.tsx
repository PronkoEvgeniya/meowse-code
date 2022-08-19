import React, { useEffect, useState } from 'react';
import { ILessonProps } from '../models/interfaces';

export const Lesson = ({ lesson }: ILessonProps) => {
  const { description, symbols, code, task, id } = lesson;
  const [symbolElements, setSymbolElements] = useState<JSX.Element[] | JSX.Element>(<div></div>);
  useEffect(() => {
    if (Array.isArray(symbols)) {
      const elements = symbols.map((symbol, i) => {
        return (
          <div key={`symbol${id}${i}`}>
            {symbol}: {code[i]}
          </div>
        );
      });
      setSymbolElements(elements);
    } else {
      setSymbolElements(
        <div>
          {symbols} {code}
        </div>
      );
    }
  }, [symbols, code, id]);
  return (
    <>
      <div>{description}</div>
      {symbolElements}
      <div>{task} ?</div>
      <textarea></textarea>
      <button>Готово</button>
    </>
  );
};
