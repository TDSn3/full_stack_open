import { useState, forwardRef, useImperativeHandle } from 'react';

interface ToggleLoginProps {
  buttonLabel: string,
  children: React.ReactNode,
}

const ToggleLogin = forwardRef(({ buttonLabel, children }: ToggleLoginProps, ref) => {
  const [visible, setVisible] = useState<boolean>(false);

  const hideWhenVisible = { display: (visible ? 'none' : '') };
  const showWhenVisible = { display: (visible ? '' : 'none') };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button type="button" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  );
});

export default ToggleLogin;
