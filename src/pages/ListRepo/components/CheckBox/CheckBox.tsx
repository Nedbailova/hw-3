import React from 'react';
import './CheckBox.scss';
import CheckIcon from '../icons/CheckIcon';

export type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({ onChange, className, checked = false, disabled = false }) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <label className={`checkbox ${className}`}>
      <input
        id="checkbox_input"
        data-testid="checkbox"
        type="checkbox"
        onChange={handleChange}
        checked={checked}
        disabled={disabled}
      />
      <div className="new_checkbox">{checked && <CheckIcon color="accent" />}</div>
    </label>
  );
};

export default CheckBox;
