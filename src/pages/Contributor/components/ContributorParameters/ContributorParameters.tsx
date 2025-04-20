import Text from 'components/Text';
import FollowIcon from 'components/icons/FollowIcon';
import RepoIcon from 'components/icons/RepoIcon';
import styles from './ContributorParameters.module.scss';
import React from 'react';

interface ContributorParametersProps {
  followers: number;
  following: number;
  publicRepos: number;
}

const ContributorParameters = ({ followers, following, publicRepos }: ContributorParametersProps) => (
    <div className={styles.info_block_parameters}>
    <div className={styles.info_block_parameters_follow}>
      <FollowIcon width={16} height={16} color="secondary" useStroke />
      <Text view="p-12" weight="bold" color="secondary">
        {followers}
      </Text>
      <Text view="p-12" color="secondary">
        followers ·
      </Text>
      <Text view="p-12" weight="bold" color="secondary">
        {following}
      </Text>
      <Text view="p-12" color="secondary">
        following
      </Text>
    </div>

    <div className={styles.info_block_parameters_repo}>
      <RepoIcon width={16} height={16} color="secondary" />
      <Text view="p-12" weight="bold" color="secondary">
        {publicRepos}
      </Text>
      <Text view="p-12" color="secondary">
        repositories
      </Text>
    </div>
  </div>
);

export default React.memo(ContributorParameters);