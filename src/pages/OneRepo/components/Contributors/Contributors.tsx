import styles from './Contributors.module.scss';
import Text from 'components/Text';

interface ContributorData {
  avatarUrl: string;
  username: string;
  name?: string | null;
  contributions?: number;
}

interface ContributorsProps {
  contributor: ContributorData;
}

const Contributors = ({ contributor }: ContributorsProps) => {
  return (
    <div className={styles.contributor}>
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

export default Contributors;
