import React from 'react';
import styles from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
  placeholder: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, className = '', placeholder = '', ...props }, ref) => {
    const combinedClassName = `${styles.inputBlock} ${className}`;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };

    return (
      <div className={combinedClassName}>
        <input
          ref={ref}
          type="text"
          className={styles.input}
          value={value}
          placeholder={placeholder}
          {...props}
          onChange={handleChange}
        />
        {afterSlot && <span className={styles.inputIcon}>{afterSlot}</span>}
      </div>
    );
  },
);

export default Input;
