import './Contributors.scss';
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
    <div className="сontributor">
      <img className="сontributor_img" src={contributor.avatarUrl} />
      <Text view="p-16" weight="bold" children={contributor.username} />
      {contributor.name && <Text view="p-16" color="secondary" children={contributor.name} />}
    </div>
  );
};

export default Contributors;
