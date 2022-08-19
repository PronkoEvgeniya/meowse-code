import gg from './gg.svg';
import fb from './fb.svg';
import ig from './ig.svg';

export const SocialBtns = (): JSX.Element => {
  return (
    <div>
      <button>
        <img src={gg} alt="gg" />
      </button>
      <button>
        <img src={fb} alt="fb" />
      </button>
      <button>
        <img src={ig} alt="ig" />
      </button>
    </div>
  );
};
