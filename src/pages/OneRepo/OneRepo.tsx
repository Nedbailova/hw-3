import { observer } from 'mobx-react-lite';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SingleRepoStore from 'store/SingleRepoStore';
import Header from 'components/Header';
import Text from 'components/Text';
import styles from './OneRepo.module.scss';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import Readme from './components/Readme/Readme';
import LanguageInfoBlock from './components/LanguageInfoBlock';
import ContributorsBlock from './components/ContributorsBlock';
import RepoParameters from './components/RepoParameters';
import RepoInfoBlock from './components/RepoInfoBlock';

const OneRepositorie = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const org = searchParams.get('org');
  const [singlerepoStore] = useState(() => new SingleRepoStore());

  useEffect(() => {
    if (name) {
      singlerepoStore.fetchRepoData(name, org || undefined);
    }
  }, [org, name]);

  const handleCardClick = () => {
    navigate(`/repos/${org ? `?org=${org}` : ''}`);
  };

  const handleContributorClick = (username: string) => {
    navigate(`/repos/${name}/contributors/${username}${org ? `?org=${org}` : ''}`);
    window.scrollTo(0, 0);
  };

  const { repoInfo, readmeHtml, newLink, isLoading, error } = singlerepoStore;

  return (
    <div className={styles.one_repo_page}>
      <div className={styles.header_block}>
        <Header />
      </div>

      <div className="container">
        {isLoading && !repoInfo ? (
          <Loader size="l" />
        ) : error ? (
          <div className={styles.name_block}>
            <ArrowRightIcon className={styles.name_block_back} width={32} height={32} onClick={handleCardClick} />
            <div className="error">Error: {error}</div>
          </div>
        ) : !repoInfo ? (
          <div className={styles.name_block}>
            <ArrowRightIcon className={styles.name_block_back} width={32} height={32} onClick={handleCardClick} />
            <div className="not-found">Repository not found</div>
          </div>
        ) : (
          <>
            <div className={styles.name_block}>
              <ArrowRightIcon className={styles.name_block_back} width={32} height={32} onClick={handleCardClick} />
              <img className={styles.name_block_img} src={repoInfo.img} alt={repoInfo.name} />
              <Text view="big-title" weight="bold">
                {repoInfo.name}
              </Text>
            </div>

            <div className={styles.info_block}>
              <RepoInfoBlock link={repoInfo.link} newLink={newLink} topics={repoInfo.topics} />

              <RepoParameters stars={repoInfo.stars} watchers={repoInfo.watchers} forks={repoInfo.forks} />

              <div className={styles.info_block_cont_and_lang}>
                <ContributorsBlock
                  contributors={repoInfo.contributors || []}
                  onContributorClick={handleContributorClick}
                />

                <LanguageInfoBlock languages={repoInfo.languages || []} />
              </div>
            </div>

            {readmeHtml && <Readme readmeHtml={readmeHtml} />}
          </>
        )}
      </div>
    </div>
  );
};

export default observer(OneRepositorie);
