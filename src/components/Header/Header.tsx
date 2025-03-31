import AvatarIcon from '../icons/AvatarIcon';
import GitIcon from '../icons/GitIcon';
import Text from '../Text';
import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header_block_content">
          <div className="git_block">
            <GitIcon width={32} height={32} />
            <Text view="p-20" weight="bold" children={'GitHub Client'} />
          </div>
          <AvatarIcon />
        </div>
      </div>
    </div>
  );
};

export default Header;
