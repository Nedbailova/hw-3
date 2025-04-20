import LinkIcon from 'components/icons/LinkIcon';
import Text from 'components/Text';
import Topic from '../Topic/Topic';
import styles from './RepoInfoBlock.module.scss';

interface RepoInfoBlockProps {
  link: string | null | undefined;
  newLink: string;
  topics: string[];
}

const RepoInfoBlock = ({ link, newLink, topics}: RepoInfoBlockProps) => (
  <div className={styles.info_block}>
    {link && (
      <div className={styles.info_block_link}>
        <LinkIcon width={16} height={17} />
        <a href={link} className="link">
          <Text view="p-16" weight="bold" color="blue">
            {newLink}
          </Text>
        </a>
      </div>
    )}

    <div className={styles.info_block_topics}>
      {topics.map((topic) => (
        <Topic key={topic}>{topic}</Topic>
      ))}
    </div>
  </div>
);

export default RepoInfoBlock;