import React from 'react';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import { IAudioLesson, ILesson, ILessonProps, ITextLesson } from '../../types/interfaces';
import { AnswerField } from './answerField';
import { tasks } from '../../assets/audio/tasks';
import { audio } from '../../assets/audio/symbols';
import { useTranslation, Trans } from 'react-i18next';
import { ICompletedLessons } from '../../app/store/actionTypes';
import img from '../../assets/images/audio-meows.png';

export const LessonContent = ({ data, type }: ILessonProps) => {
  const { textLesson, audioLesson } = useAppSelector(({ app: { textLesson, audioLesson } }) => ({
    textLesson,
    audioLesson,
  }));
  const {
    completedRuTextLessons,
    completedEnTextLessons,
    completedRuAudioLessons,
    completedEnAudioLessons,
  } = useAppSelector(
    ({
      trainer: {
        completedRuTextLessons,
        completedEnTextLessons,
        completedRuAudioLessons,
        completedEnAudioLessons,
      },
    }) => ({
      completedRuTextLessons,
      completedEnTextLessons,
      completedRuAudioLessons,
      completedEnAudioLessons,
    })
  );
  const {
    t,
    i18n: { language: lang },
  } = useTranslation();

  let lessonID: number;
  let completedLessons: ICompletedLessons | null;
  let completedScore = 0;
  let currentLesson;
  let symbolsElements: JSX.Element[] = [];
  let taskElement: JSX.Element[] = [];

  if (type === 'text') {
    lessonID = textLesson;
    currentLesson = data.length
      ? data.find((lesson) => lesson.id === lessonID)
      : { description: '', symbols: [''], code: [''], task: '', id: 0, answer: '' };
    const { symbols, code, task } = currentLesson as ITextLesson;
    symbolsElements = symbols.map((symbol, i) => (
      <div key={symbol}>
        {symbol}: {code[i]}
      </div>
    ));
    completedLessons = lang === 'ru' ? completedRuTextLessons : completedEnTextLessons;
    completedScore = completedLessons ? completedLessons[lessonID] : 0;
    taskElement = [<div key={task + lessonID}>{task.toUpperCase()} ?</div>];
  }
  if (type === 'audio') {
    lessonID = audioLesson;
    currentLesson = data.length
      ? data.find((lesson) => lesson.id === lessonID)
      : { description: '', symbols: [''], player: [''], task: '', id: 0, answer: '' };
    const { symbols, player, task } = currentLesson as IAudioLesson;
    symbolsElements = symbols.map((symbol, i) => (
      <div key={symbol + i}>
        <span>{symbol}:</span>
        <audio controls src={audio[player[i]]}></audio>
      </div>
    ));
    completedLessons = lang === 'ru' ? completedRuAudioLessons : completedEnAudioLessons;
    completedScore = completedLessons ? completedLessons[lessonID] : 0;
    taskElement = [
      <div key={task + lessonID}>
        <span>{t('lesson.task')}</span>
        {/* <Sound label={task} mp3={tasks[task]}/> */}
        <audio key={task} controls src={tasks[task]}></audio>
      </div>,
    ];
  }

  const { description, answer, score } = currentLesson as ILesson;

  return (
    <>
      <div>
        <Trans
          i18nKey={`lesson.status.${completedScore ? '1' : '0'}`}
          values={{ completedScore }}
        />
      </div>
      <div>{description}</div>
      {symbolsElements}
      {taskElement}
      <AnswerField answer={answer} score={score} type={type} />
      <div>
        <img src={img} alt="" />
      </div>
    </>
  );
};
