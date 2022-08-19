import { useNavigate, useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../app/hooks/reduxHooks';
import { setAudioLesson } from '../app/store/reducers/appSlice';
import { useEffect, useState } from 'react';
import { TrainResult } from '../components/TrainResult';

export const AudioPage = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const lessonID = useAppSelector(({ app: { audioLesson } }) => audioLesson);
  const [answer, setAnswer] = useState('');
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);
  // получаем урок из json
  // const lesson = data.find((l) => l.id === lessonID);

  const selectHandler = ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
    const lesson = Number(value);
    dispatch(setAudioLesson({ lesson }));
  };

  const completeHandler = () => {
    setAnswer(answer);
    setIsLessonCompleted(true);
  };

  useEffect(() => {
    // if (!location.pathname.includes(String(lessonID))) {
    //   console.log('navigate');
    //   navigate(`audio/${lessonID}`);
    // }
    navigate(`/audio/${lessonID}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonID]);

  return isLessonCompleted ? (
    <TrainResult
      answer={answer}
      setIsLessonCompleted={setIsLessonCompleted}
      setAnswer={setAnswer}
    />
  ) : (
    <div>
      <h2>Аудио-тренажер</h2>
      <select value={id} onChange={selectHandler}>
        {/* {data.map(({ id }) => (
          <option key={id} value={id}>
            Урок {id}
          </option>
        ))} */}
      </select>
      <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={completeHandler}>Отправить</button>
    </div>
  );
};
