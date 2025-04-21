import AvatarImg from './images/AvatarImg.png';
import styles from './AvatarIcon.module.scss';

const AvatarIcon = () => {
  return <img className={styles.avatarIcon} src={AvatarImg} alt="Avatar" />;
};

export default AvatarIcon;
