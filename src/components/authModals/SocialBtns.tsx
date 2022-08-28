import { IconFB, IconGoogle, IconInst } from '../../assets/Sprite';

export const SocialBtns = (): JSX.Element => {
  return (
    <div className="socio-btns">
      <button className="soc-btn">
        <IconGoogle />
      </button>
      <button className="soc-btn">
        <IconFB />
      </button>
      <button className="soc-btn">
        <IconInst />
      </button>
    </div>
  );
};
