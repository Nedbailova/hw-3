import { observer } from 'mobx-react-lite';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ContributorStore from 'store/ContributorStore';
import Header from 'components/Header';
import Text from 'components/Text';
import styles from './Contributor.module.scss';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import FollowIcon from 'components/icons/FollowIcon';
import RepoIcon from 'components/icons/RepoIcon';
import LinkIcon from 'components/icons/LinkIcon';
import Card from 'pages/ListRepo/components/Card';

const Contributor = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const org = searchParams.get('org');
  const [contributorStore] = useState(() => new ContributorStore());

  const repoName = location.pathname.split('/')[2];

  useEffect(() => {
    if (username) {
      contributorStore.fetchContributorData(username);
    }
  }, [username]);

  const handleBackClick = () => {
    navigate(`/repos/${repoName}${org ? `?org=${org}` : ''}`);
  };

  const { userInfo, userRepos, isLoading, error } = contributorStore;

  return (
    <div className={styles.contributor}>
      <div className={styles.header_block}>
        <Header />
      </div>

      <div className="container">
        {isLoading && !userInfo ? (
          <Loader size="l" />
        ) : error ? (
          <div className={styles.name_block}>
            <ArrowRightIcon className={styles.name_block_back} width={32} height={32} onClick={handleBackClick} />
            <div className="error">Error: {error}</div>
          </div>
        ) : !userInfo ? (
          <div className={styles.name_block}>
            <ArrowRightIcon className={styles.name_block_back} width={32} height={32} onClick={handleBackClick} />
            <div className="not-found">Contributor not found</div>
          </div>
        ) : (
          <>
            <div className={styles.name_block}>
              <ArrowRightIcon className={styles.name_block_back} width={32} height={32} onClick={handleBackClick} />
              <img className={styles.name_block_img} src={userInfo.avatarUrl} alt={userInfo.login} />
              {userInfo.name ? (
                <>
                  <Text view="big-title" weight="bold">
                    {userInfo.name}
                  </Text>
                  <Text view="p-20" color="secondary">
                    {userInfo.login}
                  </Text>
                </>
              ) : (
                <Text view="big-title" weight="bold">
                  {userInfo.login}
                </Text>
              )}
            </div>

            <div className={styles.info_block}>
              {userInfo.htmlUrl && (
                <div className={styles.info_block_link}>
                  <LinkIcon width={16} height={17} />
                  <a href={userInfo.htmlUrl} className="link">
                    <Text view="p-16" weight="bold" color="blue">
                      GitHub Profile
                    </Text>
                  </a>
                </div>
              )}

              {userInfo.bio && (
                <div className={styles.bio}>
                  <Text view="p-16">{userInfo.bio}</Text>
                </div>
              )}

              <div className={styles.info_block_parameters}>
                <div className={styles.info_block_parameters_follow}>
                  <FollowIcon width={16} height={16} color="secondary" useStroke />
                  <Text view="p-12" weight="bold" color="secondary">
                    {userInfo.followers}
                  </Text>
                  <Text view="p-12" color="secondary">
                    followers ·
                  </Text>
                  <Text view="p-12" weight="bold" color="secondary">
                    {userInfo.following}
                  </Text>
                  <Text view="p-12" color="secondary">
                    following
                  </Text>
                </div>

                <div className={styles.info_block_parameters_repo}>
                  <RepoIcon width={16} height={16} color="secondary" />
                  <Text view="p-12" weight="bold" color="secondary">
                    {userInfo.publicRepos}
                  </Text>
                  <Text view="p-12" color="secondary">
                    repositories
                  </Text>
                </div>
              </div>

              <div className={styles.additional_info}>
                {userInfo.id && (
                  <div className={styles.info_item}>
                    <Text view="p-16" weight="bold">
                      ID:
                    </Text>
                    <Text view="p-16">{userInfo.id}</Text>
                  </div>
                )}

                {userInfo.email && (
                  <div className={styles.info_item}>
                    <Text view="p-16" weight="bold">
                      Email:
                    </Text>
                    <Text view="p-16">{userInfo.email}</Text>
                  </div>
                )}

                {userInfo.company && (
                  <div className={styles.info_item}>
                    <Text view="p-16" weight="bold">
                      Company:
                    </Text>
                    <Text view="p-16">{userInfo.company}</Text>
                  </div>
                )}

                {userInfo.location && (
                  <div className={styles.info_item}>
                    <Text view="p-16" weight="bold">
                      Location:
                    </Text>
                    <Text view="p-16">{userInfo.location}</Text>
                  </div>
                )}

                {userInfo.blog && (
                  <div className={styles.info_item}>
                    <Text view="p-16" weight="bold">
                      Blog:
                    </Text>
                    <a href={userInfo.blog}>
                      <Text view="p-16" color="blue">
                        {userInfo.blog}
                      </Text>
                    </a>
                  </div>
                )}
              </div>

              <div className={styles.repositories_block}>
                <Text view="p-18" weight="bold" className={styles.repositories_block_title}>
                  Latest Repositories
                </Text>

                {userRepos.length > 0 ? (
                  <div className={styles.repositories_list}>
                    {userRepos.map((repo) => (
                      <a href={repo.htmlUrl}>
                        <Card
                          key={repo.id}
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(Contributor);
