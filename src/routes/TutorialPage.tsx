import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { tutorialContent } from '../types/constants';

export const TutorialPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [contentId, setContentId] = useState(0);
  const { description, btnContent } = tutorialContent[contentId];

  const changeHandler = () => {
    contentId === 2 ? navigate('/home') : setContentId((prev) => ++prev);
  };

  return (
    <div>
      <p>{description}</p>
      <div>
        <button onClick={changeHandler}>{btnContent}</button>
        <div>маскот</div>
      </div>
    </div>
  );
};
