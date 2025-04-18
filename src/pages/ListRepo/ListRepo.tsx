import { useNavigate, useSearchParams } from 'react-router';
import Card from 'pages/ListRepo/components/Card';
import styles from './ListRepo.module.scss';
import Text from 'components/Text';
import Button from 'pages/ListRepo/components/Button';
import Input from 'components/Input';
import { useEffect, useState } from 'react';
import Header from 'components/Header';
import Pagination from 'pages/ListRepo/components/Pagination';
import GitHubStore from 'store/GitHubStore';
import { observer } from 'mobx-react-lite';
import TypeMultidropdown from './components/TypeMultidropdown/TypeMultidropdown';
import Loader from '../../components/Loader';

const ListRepo = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('org') || '');
  const githubStore = GitHubStore.getInstance();

  useEffect(() => {
    githubStore.initFromQueryParams(searchParams);
    githubStore.fetchRepos();
  }, [githubStore, searchParams]);

  useEffect(() => {
    navigate(`?${new URLSearchParams(githubStore.getQueryParams)}`, { replace: true });
  }, [githubStore.currentOrganization, githubStore.currentPage, githubStore.selectedRepoTypes]);

  const handleCardClick = (repoName: string) => {
    navigate(`/repos/${repoName}?org=${githubStore.currentOrganization}`);
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
    <div className={styles.listRepo}>
      <div className={styles.headerBlock}>
        <Header />
      </div>

      <div className="container">
        <div className={styles.titleBlock}>
          <Text view="big-title" weight="bold">
            List of organization repositories
          </Text>
        </div>

        <div className={styles.dropdownBlock}>
          <TypeMultidropdown onChange={handleTypesChange} initialSelected={githubStore.selectedRepoTypes} />
        </div>

        <div className={styles.searchBlock}>
          <div className={styles.searchBlock_input}>
            <Input
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter organization name"
            />
          </div>
          <Button search={true} onClick={handleSearch} children={''} />
        </div>

        {githubStore.isLoading ? (
          <Loader size='l'/>
        ) : githubStore.error ? (
          <div className="error-message">{githubStore.error}</div>
        ) : (
          <div className={styles.repoBlock}>
            {githubStore.repos.map((repo) => (
              <Card
                key={repo.id}
                image={repo.owner.avatar_url}
                title={repo.name}
                subtitle={repo.description || ''}
                captionSlot="123    Updated 21 Jul"
                onClick={() => handleCardClick(repo.name)}
              />
            ))}
          </div>
        )}

        <div className={styles.paginationBlock}>
          <Pagination
            currentPage={githubStore.currentPage}
            totalPages={Math.ceil(githubStore.totalCount / githubStore.pageSize)}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(ListRepo);
