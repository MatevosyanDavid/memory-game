import { memo } from 'react';

import './index.scss';

const Button = ({ label, onClick }) => (
  <div className="button-wrapper">
    <button onClick={onClick}>{label}</button>
  </div>
);

export default memo(Button);
