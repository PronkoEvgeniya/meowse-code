import { IconLogin } from '../../assets/Sprite';

export const UserIcon = (): JSX.Element => {
  return (
    <div
      style={{
        width: '55px',
        height: '55px',
        background: '#9C56C7',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: '50%',
        alignItems: 'center',
      }}
      className="user-icon"
    >
      <IconLogin />
    </div>
  );
};
