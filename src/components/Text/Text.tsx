import * as React from 'react';
import './Text.scss';

export type TextProps = {
  /** Дополнительный класс */
  className?: string;
  /** Стиль отображения */
  view?: 'title' | 'big-title' | 'button' | 'p-20' | 'p-18' | 'p-16' | 'p-14' | 'p-12' | 'p-10';
  /** Html-тег */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'div' | 'p' | 'span';
  /** Начертание шрифта */
  weight?: 'normal' | 'medium' | 'bold';
  /** Контент */
  children: React.ReactNode;
  /** Цвет */
  color?: 'primary' | 'secondary' | 'accent' | 'blue' | 'another-blue' | 'secondary-dark';
  /** Максимальное кол-во строк */
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
  const View: string = view ? `view-${view}` : '';
  const Weight: string = weight ? `weight-${weight}` : '';
  const Color: string = color ? `color-${color}` : '';
  const ClassNames: string = `${View} ${Weight} ${Color} ${className || ''} text`;
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
