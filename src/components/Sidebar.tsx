import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../app/hooks/reduxHooks';

export const Sidebar = (): JSX.Element => {
  const { t } = useTranslation();
  const [textLesson, audioLesson, auth] = useAppSelector(
    ({ app: { textLesson, audioLesson, isAuthorized } }) => [textLesson, audioLesson, isAuthorized]
  );

  const T = (value: string): string => t(`${value}`).toLowerCase();

  return (
    <aside>
      <button disabled={!auth}>&#60;</button>
      <nav>
        <ul>
          <li>
            <NavLink to={`/audio/${audioLesson}`}>{T('audio')}</NavLink>
          </li>
          <li>
            <NavLink to={`/text/${textLesson}`}>{T('text')}</NavLink>
          </li>
          <li>
            <NavLink to={'/game'}>{T('game')}</NavLink>
          </li>
          <li>
            <NavLink to={'/test'}>{T('test')}</NavLink>
          </li>
          <li>
            <NavLink to={'/translate'}>{T('translate')}</NavLink>
          </li>
          <li>
            <NavLink to={'/about'}>{T('about')}</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
