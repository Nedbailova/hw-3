import './Topic.scss';
import { ReactNode } from 'react';
import Text from 'components/Text';

interface TopicProps {
  children: ReactNode;
}

const Topic = ({ children }: TopicProps) => {
  return (
    <div className="topic">
      <Text view="p-14" weight="bold" color="another-blue" children={children} />
    </div>
  );
};

export default Topic;
