export const User = (): JSX.Element => {
  return (
    <>
      <div
        style={{ width: '55px', height: '55px', background: 'purple' }}
        className="user-icon"
      ></div>
      <span>name</span>
      <div
        style={{
          width: '30px',
          height: '30px',
          borderBottom: '5px solid purple',
          borderRight: '5px solid purple',
          transform: 'rotate(45deg)',
        }}
        className="user-arrow"
      ></div>
    </>
  );
};
