import React from 'react';
import styles from './Button.module.scss';
import Loader from 'components/Loader';
// import SearchIcon from '../icons/SearchIcon';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  children: React.ReactNode;
  search?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  className = '',
  search = false,
  ...props
}: ButtonProps) => {
  const customClasses = [];

  customClasses.push(styles.button);

  if (className) {
    className.split(' ').forEach((cls) => {
      if (styles[cls]) customClasses.push(styles[cls]);
    });
  }

  if (search) customClasses.push(styles.search);
  if (loading) customClasses.push(styles.disabled);

  return (
    <button className={customClasses.join(' ')} disabled={loading} {...props}>
      {loading && <Loader size="s" color="#FFF" />}
      {children}
    </button>
  );
};

export default React.memo(Button);
