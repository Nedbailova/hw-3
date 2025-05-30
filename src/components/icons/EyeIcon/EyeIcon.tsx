import * as React from 'react';
import Icon, { IconProps } from 'components/icons/Icon';

const EyeIcon: React.FC<IconProps> = (props) => {
  return (
    <Icon {...props} viewBox="0 0 16 16">
      <path
        d="M8 3C5.17033 3 2.58194 4.75154 1.07575 7.68526C0.974749 7.882 0.974749 8.11772 1.07575 8.31444C2.58197 11.2484 5.17053 13 8 13C10.8295 13 13.4181 11.2485 14.9242 8.31474C15.0253 8.118 15.0253 7.88228 14.9242 7.68556C13.418 4.75175 10.8298 3.0003 8 3.0003V3ZM8 11.6575C5.75993 11.6575 3.6855 10.2972 2.39208 7.99955C3.68541 5.70228 5.75985 4.34194 8 4.34194C10.2402 4.34194 12.3145 5.70222 13.6079 7.99955C12.3146 10.2971 10.2402 11.6575 8 11.6575Z"
        fill="#AFADB5"
      />
      <ellipse cx="7.85914" cy="7.97725" rx="1.55446" ry="1.60665" fill="#AFADB5" />
    </Icon>
  );
};

export default EyeIcon;
