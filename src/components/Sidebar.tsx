import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks/reduxHooks';

export const Sidebar = (): JSX.Element => {
  const audioLesson = useAppSelector((state) => state.app.audioLesson);
  return (
    <aside>
      <button>&#60;</button>
      <nav>
        <ul>
          <li>
            <NavLink to={`/audio/${audioLesson}`}>аудио-тренажер</NavLink>
          </li>
          <li>
            <NavLink to={'/text'}>текстовый тренажер</NavLink>
          </li>
          <li>
            <NavLink to={'/game'}>мини-игра</NavLink>
          </li>
          <li>
            <NavLink to={'/test'}>тестирование</NavLink>
          </li>
          <li>
            <NavLink to={'/translate'}>переводчик</NavLink>
          </li>
          <li>
            <NavLink to={'/about'}>о курсе</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
