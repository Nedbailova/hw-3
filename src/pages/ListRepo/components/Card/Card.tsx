import React from 'react';
import Text from 'components/Text';
import styles from './Card.module.scss';
import StarIcon from 'components/icons/StarIcon';
import ForkIcon from 'pages/OneRepo/components/icons/ForkIcon';

export type CardProps = {
  className?: string;
  image?: string;
  captionSlot?: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  contentSlot?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  actionSlot?: React.ReactNode;
  forksCount?: number; 
  repoLanguage?: string|null;
};

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  onClick,
  contentSlot,
  forksCount,
  repoLanguage,
  ...props
}) => {
  return (
    <div className={`${className} ${styles.card}`} id="card" onClick={onClick} {...props}>
      <img src={image} />
      <div className={styles.textBlock}>
        {captionSlot && (
          <div className={styles.captionBlock}>
            <StarIcon color="star-accent" width={13} height={13} />
            <Text color="secondary" view="p-14" weight="medium">
              {captionSlot}
            </Text>
            <ForkIcon width={13} height={13}/>
            <Text color="secondary" view="p-14" weight="medium">
              {forksCount}
            </Text>
            <Text color="secondary" view="p-14" weight="medium">
              {repoLanguage}
            </Text>
          </div>
        )}
        <Text view="p-20" weight="medium" maxLines={2}>
          {title}
        </Text>
        <Text color="secondary" view="p-16" weight="normal" maxLines={3}>
          {subtitle}
        </Text>
      </div>
      <div className={styles.contentBlock}>{contentSlot && <Text view="p-16" color="secondary-dark">{contentSlot}</Text>}</div>
    </div>
  );
};

export default React.memo(Card);
