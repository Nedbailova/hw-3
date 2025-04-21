import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const ArrowLeftIcon: React.FC<IconProps & { disabled?: boolean }> = (props) => {
  const { disabled, color, onClick, ...restProps } = props;

  const strokeColor = disabled ? 'secondary' : color ? color : 'some-black';

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onClick?.(e);
  };

  return (
    <Icon
      {...restProps}
      viewBox="0 0 32 32"
      onClick={handleClick}
      style={{ cursor: disabled ? '' : 'pointer' }}
      color={strokeColor}
    >
      <path
        d="M12.38 26.5599L21.0733 17.8666C22.1 16.8399 22.1 15.1599 21.0733 14.1333L12.38 5.43994"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};

export default ArrowLeftIcon;
