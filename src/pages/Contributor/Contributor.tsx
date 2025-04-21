import { observer } from 'mobx-react-lite';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ContributorStore from 'store/ContributorStore';
import Header from 'components/Header';
import Text from 'components/Text';
import styles from './Contributor.module.scss';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import LinkIcon from 'components/icons/LinkIcon';
import ContributorParameters from './components/ContributorParameters';
import ContributorInfo from './components/ContributorInfo';
import ContributorRepo from './components/ContributorRepo';

const Contributor = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const org = searchParams.get('org');
  const [contributorStore] = useState(() => new ContributorStore());

  const { repoName } = useParams();
  useEffect(() => {
    if (username) {
      contributorStore.fetchContributorData(username);
    }
  }, [username]);

  const handleBackClick = () => {
    navigate(`/repos/${repoName}${org ? `?org=${org}` : ''}`);
  };

  const { userInfo, userRepos, isLoading, error } = contributorStore;

  const infoItems = [
    { label: 'ID:', value: userInfo?.id || '' },
    { label: 'Email:', value: userInfo?.email || '' },
    { label: 'Company:', value: userInfo?.company || '' },
    { label: 'Location:', value: userInfo?.location || '' },
    { label: 'Blog:', value: userInfo?.blog || '', isLink: true },
  ].filter((item) => item.value);

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

              <ContributorParameters
                followers={userInfo.followers}
                following={userInfo.following}
                publicRepos={userInfo.publicRepos}
              />

              {infoItems.length > 0 && <ContributorInfo items={infoItems} />}

              <ContributorRepo repos={userRepos} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default observer(Contributor);
