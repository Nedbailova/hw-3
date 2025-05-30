import styles from './Topic.module.scss';
import { ReactNode } from 'react';
import Text from 'components/Text';
import React from 'react';

interface TopicProps {
  children: ReactNode;
}

const Topic = ({ children }: TopicProps) => {
  return (
    <div className={styles.topic}>
      <Text view="p-14" weight="bold" color="another-blue">
        {children}
      </Text>
    </div>
  );
};

export default React.memo(Topic);
