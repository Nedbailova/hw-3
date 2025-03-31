import React from 'react';
import './LanguagesInfo.scss';
import Text from 'components/Text';

interface LanguageInfo {
  name: string;
  percent: number;
}

interface LanguageStatsProps {
  languages: LanguageInfo[];
}

const LanguagesInfo: React.FC<LanguageStatsProps> = ({ languages }) => {
  const sortedLanguages = [...languages].sort((a, b) => b.percent - a.percent);

  const languageColors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Python: '#3572A5',
    Java: '#b07219',
    Default: '#ccc',
  };

  return (
    <div className="language_stats">
      <div className="progress_bar">
        {sortedLanguages.map((lang) => (
          <div
            key={lang.name}
            className="progress_segment"
            style={{
              width: `${lang.percent}%`,
              backgroundColor: languageColors[lang.name] || languageColors.Default,
            }}
          />
        ))}
      </div>
      <div className="language_list">
        {sortedLanguages.map((lang) => (
          <div className="language_item">
            <div className="language_info">
              <div
                className="language_color"
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
};

export default LanguagesInfo;
