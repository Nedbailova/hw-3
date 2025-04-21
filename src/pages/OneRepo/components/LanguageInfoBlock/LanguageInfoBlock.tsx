import Text from 'components/Text';
import LanguagesInfo, { LanguageStatsProps } from '../LanguagesInfo/LanguagesInfo';
import styles from './LanguageInfoBlock.module.scss';
import React from 'react';

const LanguageInfoBlock = ({ languages }: LanguageStatsProps) => (
  <div className={styles.info_lang}>
    <div className={styles.language_title}>
      <Text view="p-18" weight="bold">
        Languages
      </Text>
    </div>
    <LanguagesInfo languages={languages} />
  </div>
);

export default React.memo(LanguageInfoBlock);