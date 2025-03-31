import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent' | 'some-black' | 'star-accent';
  useStroke?: boolean;
  useStrokeColor?: boolean;
};

const COLOR_MAP: Record<string, string> = {
  primary: '#000',
  secondary: '#afadb5',
  accent: '#1f883d',
  'some-black': '#151411',
  'star-accent': '#FF9432',
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  className,
  color,
  width = 24,
  height = 24,
  useStroke = false,
  useStrokeColor = false,
  ...props
}: IconProps) => {
  const fillColor = color ? COLOR_MAP[color] : 'currentColor';
  return (
    <svg
      stroke={useStrokeColor ? fillColor : 'none'}
      className={className}
      color={fillColor}
      fill={useStroke ? fillColor : 'none'}
      width={width}
      height={height}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {props.children}
    </svg>
  );
};

export default Icon;
