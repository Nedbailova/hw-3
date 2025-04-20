import React from 'react';
import styles from './Contributors.module.scss';
import Text from 'components/Text';

export interface ContributorData {
  avatarUrl: string;
  username: string;
  name?: string | null;
  contributions?: number;
}

export interface ContributorsProps {
  contributor: ContributorData;
  onClick: React.MouseEventHandler;
}


const Contributors = ({ contributor, onClick }: ContributorsProps) => {
  return (
    <div className={styles.contributor} onClick={onClick}>
      <img className={styles.contributor_img} src={contributor.avatarUrl} alt={contributor.username} />
      <Text view="p-16" weight="bold">
        {contributor.username}
      </Text>
      {contributor.name && (
        <Text view="p-16" color="secondary">
          {contributor.name}
        </Text>
      )}
    </div>
  );
};

export default React.memo(Contributors);
