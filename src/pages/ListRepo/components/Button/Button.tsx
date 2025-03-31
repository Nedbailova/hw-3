import React from 'react';
import './Button.scss';
import Loader from '../Loader';
import SearchIcon from '../icons/SearchIcon';

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
  const ClassName: string = loading
    ? `button ${className} ${search ? 'search' : ''} disabled`
    : `button ${className} ${search ? 'search' : ''}`;

  return (
    <button className={ClassName} disabled={loading} {...props}>
      {loading && <Loader size="s" color="#FFF" />}
      {search && <SearchIcon />}
      {children}
    </button>
  );
};

export default Button;
