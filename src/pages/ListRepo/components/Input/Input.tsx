import React from 'react';
import './Input.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  placeholder: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className = '', placeholder = '', ...props }, ref) => {
    const ClassName: string = 'input-block ' + className;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
    return (
      <div className={ClassName}>
        <input
          ref={ref}
          type="text"
          className="input"
          value={value}
          placeholder={placeholder}
          {...props}
          onChange={handleChange}
        />
        {afterSlot && <span className="input-icon">{afterSlot}</span>}
      </div>
    );
  },
);

export default Input;
