import Text from 'components/Text';
import StarIcon from 'components/icons/StarIcon';
import EyeIcon from 'components/icons/EyeIcon';
import ForkIcon from 'components/icons/ForkIcon';
import styles from './RepoParameters.module.scss';
import React from 'react';

interface RepoParametersProps {
  stars: number;
  watchers: number;
  forks: number;
}

const RepoParameters = ({ stars, watchers, forks }: RepoParametersProps) => (
  <div className={styles.info_block_parameters}>
    <div className={styles.info_block_parameters_stars}>
      <StarIcon width={16} height={16} color="secondary" useStroke />
      <Text view="p-12" weight="bold" color="secondary">
        {stars}
      </Text>
      <Text view="p-12" color="secondary">
        stars
      </Text>
    </div>

    <div className={styles.info_block_parameters_watchers}>
      <EyeIcon width={16} height={16} />
      <Text view="p-12" weight="bold" color="secondary">
        {watchers}
      </Text>
      <Text view="p-12" color="secondary">
        watching
      </Text>
    </div>

    <div className={styles.info_block_parameters_forks}>
      <ForkIcon width={16} height={16} />
      <Text view="p-12" weight="bold" color="secondary">
        {forks}
      </Text>
      <Text view="p-12" color="secondary">
        forks
      </Text>
    </div>
  </div>
);

export default React.memo(RepoParameters);