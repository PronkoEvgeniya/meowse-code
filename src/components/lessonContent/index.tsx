import React from 'react';
import { useAppSelector } from '../../app/hooks/reduxHooks';
import { IAudioLesson, ILesson, ILessonProps, ITextLesson } from '../../types/interfaces';
import { AnswerField } from './answerField';
import { tasks } from '../../assets/audio/tasks';
import { audio } from '../../assets/audio/symbols';
import { useTranslation, Trans } from 'react-i18next';
import { ICompletedLessons } from '../../app/store/actionTypes';
import img from '../../assets/images/audio-meows.png';
import { AudioBtn } from '../audioButton';
import { Lang, nullAudioLesson, nullTextLesson, Trainers } from '../../types/constants';
import './index.scss';

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
    i18n: { language: lang },
  } = useTranslation();

  let lessonID: number;
  let completedLessons: ICompletedLessons | null;
  let completedScore = 0;
  let currentLesson;
  let symbolsElements: JSX.Element[] = [];
  let taskElement: JSX.Element[] = [];

  if (type === Trainers.text) {
    lessonID = textLesson;
    currentLesson = data.length ? data.find((lesson) => lesson.id === lessonID) : nullTextLesson;
    const { symbols, code, task } = currentLesson as ITextLesson;
    symbolsElements = symbols.map((symbol, i) => (
      <div className="symbol-block" key={symbol}>
        <p className="letter">{symbol.toUpperCase()}:</p>
        <p className="code">{code[i]}</p>
      </div>
    ));
    completedLessons = lang === Lang.ru ? completedRuTextLessons : completedEnTextLessons;
    completedScore = completedLessons ? completedLessons[lessonID] : 0;
    taskElement = [
      <div className="symbol-block task" key={task + lessonID}>
        <span className="letter">?</span>
        <p className="code">{task.toUpperCase()}</p>
      </div>,
    ];
  }
  if (type === Trainers.audio) {
    lessonID = audioLesson;
    currentLesson = data.length ? data.find((lesson) => lesson.id === lessonID) : nullAudioLesson;
    const { symbols, player, task } = currentLesson as IAudioLesson;
    symbolsElements = symbols.map((symbol, i) => (
      <AudioBtn key={symbol + i} value={symbol.toUpperCase()} src={audio[player[i]]} />
    ));
    completedLessons = lang === Lang.ru ? completedRuAudioLessons : completedEnAudioLessons;
    completedScore = completedLessons ? completedLessons[lessonID] : 0;
    taskElement = [<AudioBtn key={task + lessonID} value="?" src={tasks[task]} className="task" />];
  }

  const { description, answer, score } = currentLesson as ILesson;

  return (
    <div className="lesson">
      <div className={`status ${String(!!completedScore)}`}>
        <Trans
          i18nKey={`lesson.status.${completedScore ? '1' : '0'}`}
          values={{ completedScore }}
        />
      </div>
      <div className="description">{description}</div>
      <div className="content">
        <div className="symbols">{symbolsElements}</div>
        <hr className="decorative-line" />
        <div className="tasks">{taskElement}</div>
        <AnswerField answer={answer} score={score} type={type} />
        <div className="mascot"></div>
      </div>
    </div>
  );
};
