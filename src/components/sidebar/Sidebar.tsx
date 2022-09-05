import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks/reduxHooks';
import { setSidebarBtnState } from '../../app/store/reducers/appSlice';
import { SidebarButtons } from '../../types/constants';
import './sidebar.scss';

export const Sidebar = (): JSX.Element => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [textLesson, audioLesson] = useAppSelector(({ app: { textLesson, audioLesson } }) => [
    textLesson,
    audioLesson,
  ]);
  const sidebarState = useAppSelector(({ app: { sidebarBtn } }) => sidebarBtn);

  const T = (value: string): string => t(`${value}`).toLowerCase();

  const sidebarToggleHandler = () => dispatch(setSidebarBtnState());

  return (
    <aside className={!sidebarState ? 'sidebar__closed' : ''}>
      <button onClick={sidebarToggleHandler}>
        {sidebarState ? SidebarButtons.close : SidebarButtons.open}
      </button>
      <nav>
        <ul>
          <li>
            <NavLink to={`/audio/${audioLesson}`}>{T('audio')}</NavLink>
          </li>
          <li>
            <NavLink to={`/text/${textLesson}`}>{T('text')}</NavLink>
          </li>
          <li>
            <NavLink to={'/game'}>{T('game.title')}</NavLink>
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
