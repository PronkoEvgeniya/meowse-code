import { useAppDispatch } from '../app/hooks/reduxHooks';
import { setTextData } from '../app/store/reducers/appSlice';
import { useEffect } from 'react';
// import { TrainResult } from '../components/TrainResult';
import { LessonSelect } from '../components/lessonSelect';
import { LessonContent } from '../components/lessonContent';
import data from '../data/text.json';

export const TextTrainerPage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTextData({ data }));
  }, [dispatch]);

  return (
    <div>
      <h2>Текстовый тренажер</h2>
      <LessonSelect />
      <LessonContent />
      {/* <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={completeHandler}>Отправить</button> */}
    </div>
  );
};
