import Text from 'components/Text';
import Contributors from '../Contributors/Contributors';
import styles from './ContributorsBlock.module.scss';
import React from 'react';
import { Contributor } from 'store/SingleRepoStore/types';

interface ContributorsSectionProps {
  contributors: Contributor[];
  onContributorClick: (username: string) => void;
}

const ContributorsBlock = ({ contributors, onContributorClick }: ContributorsSectionProps) => (
  <div className={styles.info_cont}>
    <div className={styles.contributor_title}>
      <Text view="p-18" weight="bold">
        Contributors
      </Text>
      <div className={styles.contributor_circle}>
        <Text view="p-10" weight="bold" color="secondary-dark">
          {contributors?.length || 0}
        </Text>
      </div>
    </div>
    <div className={styles.contributors}>
      {contributors?.map((c) => (
        <Contributors key={c.username} contributor={c} onClick={() => onContributorClick(c.username)} />
      ))}
    </div>
  </div>
);

export default React.memo(ContributorsBlock);