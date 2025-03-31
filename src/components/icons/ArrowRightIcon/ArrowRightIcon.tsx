import * as React from 'react';
import Icon, { IconProps } from '../Icon';

const ArrowRightIcon: React.FC<IconProps & { disabled?: boolean }> = (props) => {
  const { disabled, color, onClick, ...restProps } = props;

  const strokeColor = disabled ? '#888888' : color ? color : '#1F883D';

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  return (
    <Icon {...restProps} viewBox="0 0 32 32" onClick={handleClick} style={{ cursor: disabled ? '' : 'pointer' }}>
      <path
        d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowRightIcon;
