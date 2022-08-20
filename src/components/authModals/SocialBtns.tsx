import { IconFB, IconGoogle, IconInst } from '../../assets/Sprite';

export const SocialBtns = (): JSX.Element => {
  return (
    <div>
      <button>
        <IconGoogle />
      </button>
      <button>
        <IconFB />
      </button>
      <button>
        <IconInst />
      </button>
    </div>
  );
};
