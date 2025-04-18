import { observer } from 'mobx-react-lite';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SingleRepoStore from 'store/SingleRepoStore';
import Header from 'components/Header';
import Text from 'components/Text';
import styles from './OneRepo.module.scss';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import LinkIcon from 'components/icons/LinkIcon';
import StarIcon from 'components/icons/StarIcon';
import Topic from './components/Topic';
import LanguagesInfo from './components/LanguagesInfo';
import EyeIcon from './components/icons/EyeIcon';
import ForkIcon from './components/icons/ForkIcon';
import Contributors from './components/Contributors';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader';

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
              {repoInfo.link && (
                <div className={styles.info_block_link}>
                  <LinkIcon width={16} height={17} />
                  <a href={repoInfo.link} className="link">
                    <Text view="p-16" weight="bold" color="blue">
                      {newLink}
                    </Text>
                  </a>
                </div>
              )}

              <div className={styles.info_block_topics}>
                {repoInfo.topics.map((topic) => (
                  <Topic key={topic}>{topic}</Topic>
                ))}
              </div>

              <div className={styles.info_block_parameters}>
                <div className={styles.info_block_parameters_stars}>
                  <StarIcon width={16} height={16} color="secondary" useStroke />
                  <Text view="p-12" weight="bold" color="secondary">
                    {repoInfo.stars}
                  </Text>
                  <Text view="p-12" color="secondary">
                    stars
                  </Text>
                </div>

                <div className={styles.info_block_parameters_watchers}>
                  <EyeIcon width={16} height={16} />
                  <Text view="p-12" weight="bold" color="secondary">
                    {repoInfo.watchers}
                  </Text>
                  <Text view="p-12" color="secondary">
                    watching
                  </Text>
                </div>

                <div className={styles.info_block_parameters_forks}>
                  <ForkIcon width={16} height={16} />
                  <Text view="p-12" weight="bold" color="secondary">
                    {repoInfo.forks}
                  </Text>
                  <Text view="p-12" color="secondary">
                    forks
                  </Text>
                </div>
              </div>

              <div className={styles.info_block_cont_and_lang}>
                <div className={styles.info_cont}>
                  <div className={styles.contributor_title}>
                    <Text view="p-18" weight="bold">
                      Contributors
                    </Text>
                    <div className={styles.contributor_circle}>
                      <Text view="p-10" weight="bold" color="secondary-dark">
                        {repoInfo.contributors?.length || 0}
                      </Text>
                    </div>
                  </div>
                  <div className={styles.contributors}>
                    {repoInfo.contributors?.map((c) => <Contributors key={c.username} contributor={c} onClick={() => handleContributorClick(c.username)}/>)}
                  </div>
                </div>

                <div className={styles.info_lang}>
                  <div className={styles.language_title}>
                    <Text view="p-18" weight="bold">
                      Languages
                    </Text>
                  </div>
                  {repoInfo.languages && <LanguagesInfo languages={repoInfo.languages} />}
                </div>
              </div>
            </div>

            <div className={styles.readme_block}>
              {readmeHtml && (
                <>
                  <div className={styles.readme_block_title}>
                    <Text view="p-12" weight="bold">
                      README.md
                    </Text>
                  </div>
                  <div className={styles.markdown_body} dangerouslySetInnerHTML={{ __html: readmeHtml }} />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(OneRepositorie);
