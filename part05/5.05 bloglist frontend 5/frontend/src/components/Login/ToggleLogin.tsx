import { useState } from 'react';

interface ToggleLoginProps {
  buttonLabel: string,
  children: React.ReactNode,
}

function ToggleLogin({ buttonLabel, children }: ToggleLoginProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const hideWhenVisible = { display: (visible ? 'none' : '') };
  const showWhenVisible = { display: (visible ? '' : 'none') };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

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
}

export default ToggleLogin;
