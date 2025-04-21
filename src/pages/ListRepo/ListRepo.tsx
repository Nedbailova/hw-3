import { useNavigate, useSearchParams } from 'react-router';
import Card from 'components/Card';
import styles from './ListRepo.module.scss';
import Text from 'components/Text';
import Button from 'components/Button';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import GitHubStore from 'store/GitHubStore';
import { Repo } from 'store/GitHubStore/types';
import { observer } from 'mobx-react-lite';
import TypeMultidropdown from './components/TypeMultidropdown/TypeMultidropdown';
import Loader from 'components/Loader';
import SearchIcon from 'components/icons/SearchIcon';
import useRecentRepos from './useRecentRepos';

const ListRepo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('org') || '');
  const githubStore = GitHubStore.getInstance();
  const { recentRepos, addRecentRepo } = useRecentRepos();

  useEffect(() => {
    githubStore.initFromQueryParams(searchParams);
    githubStore.fetchRepos();
  }, [githubStore, searchParams]);

  useEffect(() => {
    navigate(`?${new URLSearchParams(githubStore.getQueryParams)}`, { replace: true });
  }, [githubStore.currentOrganization, githubStore.currentPage, githubStore.selectedRepoTypes]);

  const handleCardClick = (repo: Repo,) => {
    const org = githubStore.currentOrganization;
    addRecentRepo({
      name: repo.name,
      org,
      avatarUrl: repo.owner.avatar_url,
      description: repo.description || '',
      stargazersCount: repo.stargazers_count,
      updatedAt: repo.updated_at,
    });
    navigate(`/repos/${repo.name}?org=${org}`);
    window.scrollTo(0, 0);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handlePageChange = (page: number) => {
    githubStore.setPage(page);
  };

  const handleSearch = async () => {
    if (inputValue.trim()) {
      try {
        githubStore.isLoading = true;
        await githubStore.setOrganization(inputValue.trim());
      } catch (error) {
        console.error('Search failed:', error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleTypesChange = (types: string[]) => {
    githubStore.setRepoTypes(types);
  };

  return (
    <div className={styles.list_repo}>
      <div className={styles.header_block}>
        <Header />
      </div>

      <div className="container">
        <div className={styles.title_block}>
          <Text view="big-title" weight="bold">
            List of organization repositories
          </Text>
        </div>

        <div className={styles.dropdown_block}>
          <TypeMultidropdown onChange={handleTypesChange} initialSelected={githubStore.selectedRepoTypes} />
        </div>

        <div className={styles.search_block}>
          <div className={styles.search_block_input}>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter organization name"
            />
          </div>
          <Button search={true} onClick={handleSearch}>
            <SearchIcon />{' '}
          </Button>
        </div>

        {githubStore.isLoading ? (
          <Loader size="l" />
        ) : githubStore.error ? (
          <div className="error-message">{githubStore.error}</div>
        ) : githubStore.repos.length > 0 ? (
          <div className={styles.repo_block}>
            {githubStore.repos.map((repo) => (
              <Card
                key={repo.id}
                image={repo.owner.avatar_url}
                title={repo.name}
                subtitle={repo.description || ''}
                captionSlot={` ${repo.stargazers_count} ${repo.updated_at}`}
                onClick={() => handleCardClick(repo)}
              />
            ))}
          </div>
        ) : (
          <Text view="p-18">No repositories found</Text>
        )}

        <div className={styles.pagination_block}>
          <Pagination
            currentPage={githubStore.currentPage}
            totalPages={Math.ceil(githubStore.totalCount / githubStore.pageSize)}
            onPageChange={handlePageChange}
          />
        </div>

        {recentRepos.length > 0 && (
          <div className={styles.recent_repos_block}>
            <Text view="title" weight="bold" className={styles.recent_title}>
              Recently viewed
            </Text>
            <div className={styles.repo_block}>
              {recentRepos.map((repo, index) => {
                return (
                  <Card
                    key={`recent-${index}`}
                    image={repo.avatarUrl || ''}
                    title={repo.name}
                    subtitle={repo.description || ''}
                    captionSlot={`${repo.stargazersCount || 0} ${repo.updatedAt || ''}`}
                    onClick={() => {
                      githubStore.setOrganization(repo.org);
                      navigate(`/repos/${repo.name}?org=${repo.org}`);
                    }}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(ListRepo);
