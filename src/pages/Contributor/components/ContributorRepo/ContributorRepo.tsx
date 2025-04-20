import Text from 'components/Text';
import Card from 'components/Card';
import styles from './ContributorRepo.module.scss';
import React from 'react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  htmlUrl: string;
  forksCount: number;
  language: string | null;
  stargazersCount: number;
  updatedAt: string;
}

const ContributorRepo = ({ repos }: { repos: Repository[] }) => (
  <div className={styles.repositories_block}>
    <Text view="p-18" weight="bold" className={styles.repositories_block_title}>
      Latest Repositories
    </Text>

    {repos.length > 0 ? (
      <div className={styles.repositories_list}>
        {repos.map((repo) => (
          <a key={repo.id} href={repo.htmlUrl}>
            <Card
              title={repo.name}
              subtitle={repo.description || ''}
              forksCount={repo.forksCount}
              repoLanguage={repo.language}
              captionSlot={`${repo.stargazersCount}`}
              contentSlot={`Updated: ${new Date(repo.updatedAt).toLocaleDateString()}`}
            />
          </a>
        ))}
      </div>
    ) : (
      <Text view="p-16">No repositories found</Text>
    )}
  </div>
);

export default React.memo(ContributorRepo);