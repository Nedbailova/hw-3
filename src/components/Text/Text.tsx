import * as React from 'react';
import styles from './Text.module.scss';

export type TextProps = {
  className?: string;
  view?: 'title' | 'big-title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14' | 'p-12' | 'p-10';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  weight?: 'normal' | 'medium' | 'bold';
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'accent' | 'blue' | 'another-blue' | 'secondary-dark';
  maxLines?: number;
  onClick?: () => void;
};

const Text: React.FC<TextProps> = ({
  className = '',
  view,
  tag: Tag = 'p',
  weight,
  children,
  color,
  maxLines,
  onClick,
}: TextProps) => {
  const View: string = view ? styles[`view-${view}`] : '';
  const Weight: string = weight ? styles[`weight-${weight}`] : '';
  const Color: string = color ? styles[`color-${color}`] : '';
  const ClassNames: string = `${View} ${Weight} ${Color} ${className || ''} ${styles.text}`;
  const maxLinesStyle: object = maxLines
    ? { overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: maxLines, WebkitBoxOrient: 'vertical' }
    : {};

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Tag className={ClassNames} color={Color} style={maxLinesStyle} onClick={handleClick}>
      {children}
    </Tag>
  );
};

export default Text;
