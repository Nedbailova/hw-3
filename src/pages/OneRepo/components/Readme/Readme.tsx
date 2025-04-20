import React from 'react';
import styles from './Readme.module.scss';
import Text from 'components/Text';

interface ReadmeProps {
  readmeHtml: string | null;
}

const Readme = ({ readmeHtml }: ReadmeProps) => {
  if (!readmeHtml) return null;

  return (
    <div className={styles.readme_block}>
      <div className={styles.readme_block_title}>
        <Text view="p-12" weight="bold">
          README.md
        </Text>
      </div>
      <div className={styles.markdown_body} dangerouslySetInnerHTML={{ __html: readmeHtml }} />
    </div>
  );
};

export default React.memo(Readme);
