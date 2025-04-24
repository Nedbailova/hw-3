import React from 'react';
import { observer } from 'mobx-react-lite';
import styles from './LanguagesInfo.module.scss';
import Text from 'components/Text';
import { languageColors } from './languageColors';

export interface LanguageInfo {
  name: string;
  percent: number;
}

export interface LanguageStatsProps {
  languages: LanguageInfo[];
}

const LanguagesInfo: React.FC<LanguageStatsProps> = observer(({ languages }) => {
  const sortedLanguages = [...languages].sort((a, b) => b.percent - a.percent);

  return (
    <div className={styles.language_stats}>
      <div className={styles.progress_bar}>
        {sortedLanguages.map((lang) => (
          <div
            key={lang.name}
            className={styles.progress_segment}
            style={{
              width: `${lang.percent}%`,
              backgroundColor: languageColors[lang.name] || languageColors.Default,
            }}
          />
        ))}
      </div>
      <div className={styles.language_list}>
        {sortedLanguages.map((lang) => (
          <div key={lang.name} className={styles.language_item}>
            <div className={styles.language_info}>
              <div
                className={styles.language_color}
                style={{ backgroundColor: languageColors[lang.name] || languageColors.Default }}
              />
              <Text view="p-14">{lang.name}</Text>
              <Text view="p-14" color="secondary">
                {lang.percent}%
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default React.memo(LanguagesInfo);
