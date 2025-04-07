import AvatarIcon from '../icons/AvatarIcon';
import GitIcon from '../icons/GitIcon';
import Text from '../Text';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles.headerBlockContent}>
          <div className={styles.gitBlock}>
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
