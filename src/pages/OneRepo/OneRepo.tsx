import { useNavigate, useParams } from 'react-router';
import Header from 'components/Header';
import Text from 'components/Text';
import './OneRepo.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ArrowRightIcon from 'components/icons/ArrowRightIcon';
import LinkIcon from 'pages/OneRepo/components/icons/LinkIcon';
import StarIcon from 'components/icons/StarIcon';
import Topic from 'pages/OneRepo/components/Topic';
import LanguagesInfo from 'pages/OneRepo/components/LanguagesInfo';
import EyeIcon from 'pages/OneRepo/components/icons/EyeIcon';
import ForkIcon from 'pages/OneRepo/components/icons/ForkIcon';
import Contributors from 'pages/OneRepo/components/Contributors';

interface LanguageInfo {
  name: string;
  percent: number;
}

interface Contributor {
  avatarUrl: string;
  username: string;
  name: string | null;
  contributions: number;
}

interface RepoData {
  name: string;
  description: string | null;
  img: string;
  readmeHtml?: string;
  stars: number;
  forks: number;
  language: string | null;
  topics: string[];
  link?: string | null;
  watchers: number;
  languages?: LanguageInfo[];
  contributors?: Contributor[];
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
}

interface GitHubUser {
  name: string | null;
}

const OneRepositorie = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [repoInfo, setRepoInfo] = useState<RepoData | null>(null);
  const [readmeHtml, setReadmeHtml] = useState('');
  const [newLink, setNewLink] = useState('');

  const removeSVGTags = (html: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    doc.querySelectorAll('svg').forEach((svg) => svg.remove());
    return doc.body.innerHTML;
  };

  function editLink(url: string | null | undefined) {
    if (!url) return '';
    const parts = url.split('/');
    return parts[2];
  }

  const handleCardClick = () => {
    navigate('/Repos');
  };

  useEffect(() => {
    const fetchRepoData = async () => {
      if (!name) return;

      try {
        const repoResponse = await axios.get<{
          name: string;
          description: string | null;
          owner: { avatar_url: string };
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          topics: string[];
          homepage: string | null;
          watchers: number;
        }>(`https://api.github.com/repos/ktsstudio/${name}`, {
          headers: {
            Accept: 'application/vnd.github+json',
          },
        });

        let cleanedHtml = '';
        try {
          const readmeResponse = await axios.get<string>(`https://api.github.com/repos/ktsstudio/${name}/readme`, {
            headers: {
              Accept: 'application/vnd.github.html',
            },
          });
          cleanedHtml = removeSVGTags(readmeResponse.data);
        } catch {
          console.log('README не найден');
        }

        let languages: LanguageInfo[] = [];
        try {
          const languagesResponse = await axios.get<Record<string, number>>(
            `https://api.github.com/repos/ktsstudio/${name}/languages`,
            {
              headers: {
                Accept: 'application/vnd.github+json',
              },
            },
          );

          const totalBytes = Object.values(languagesResponse.data).reduce((sum, bytes) => sum + bytes, 0);
          languages = Object.entries(languagesResponse.data).map(([lang, bytes]) => ({
            name: lang,
            percent: parseFloat(((bytes / totalBytes) * 100).toFixed(1)),
          }));
        } catch {
          console.log('Не удалось загрузить данные о языках');
        }

        let contributors: Contributor[] = [];
        try {
          const contributorsResponse = await axios.get<GitHubContributor[]>(
            `https://api.github.com/repos/ktsstudio/${name}/contributors`,
            {
              headers: {
                Accept: 'application/vnd.github+json',
              },
            },
          );

          contributors = await Promise.all(
            contributorsResponse.data.map(async (contributor) => {
              try {
                const userResponse = await axios.get<GitHubUser>(`https://api.github.com/users/${contributor.login}`, {
                  headers: {
                    Accept: 'application/vnd.github+json',
                  },
                });

                return {
                  avatarUrl: contributor.avatar_url,
                  username: contributor.login,
                  name: userResponse.data.name || null,
                  contributions: contributor.contributions,
                };
              } catch {
                console.error(`Error fetching user ${contributor.login}:`);
                return {
                  avatarUrl: contributor.avatar_url,
                  username: contributor.login,
                  name: null,
                  contributions: contributor.contributions,
                };
              }
            }),
          );

          contributors.sort((a, b) => {
            if (b.contributions !== a.contributions) {
              return b.contributions - a.contributions;
            }

            if (a.name && !b.name) return -1;
            if (!a.name && b.name) return 1;
            if (a.name && b.name) return a.name.localeCompare(b.name);

            return a.username.localeCompare(b.username);
          });
        } catch {
          console.error('Error fetching contributors:');
        }

        try {
          setNewLink(editLink(repoResponse.data.homepage));
        } catch {
          console.error('No Link');
        }

        setRepoInfo({
          name: repoResponse.data.name,
          description: repoResponse.data.description,
          img: repoResponse.data.owner.avatar_url,
          stars: repoResponse.data.stargazers_count,
          forks: repoResponse.data.forks_count,
          language: repoResponse.data.language,
          topics: repoResponse.data.topics,
          link: repoResponse.data.homepage,
          watchers: repoResponse.data.watchers,
          languages,
          contributors,
        });

        setReadmeHtml(cleanedHtml);
      } catch {
        console.log('Ошибка загрузки данных');
      }
    };

    fetchRepoData();
  }, [name]);

  return (
    <div className="one_repo_page">
      <div className="header_block">
        <Header />
      </div>

      <div className="container">
        <div className="name_block">
          <ArrowRightIcon className="name_block_back" width={32} height={32} onClick={() => handleCardClick()} />
          <img className="name_block_img" src={repoInfo?.img} alt={repoInfo?.name || 'Repository'} />
          <Text view="big-title" weight="bold">
            {repoInfo?.name}
          </Text>
        </div>

        <div className="info_block">
          {repoInfo?.link && (
            <div className="info_block_link">
              <LinkIcon width={16} height={17} />
              <a href={repoInfo?.link} className="link">
                <Text view="p-16" weight="bold" color="blue">
                  {newLink}
                </Text>
              </a>
            </div>
          )}

          <div className="info_block_topics">{repoInfo?.topics.map((topic) => <Topic key={topic}>{topic}</Topic>)}</div>

          <div className="info_block_parameters">
            <div className="info_block_parameters_stars">
              <StarIcon width={16} height={16} color="secondary" useStroke={true} />
              <Text view="p-12" weight="bold" color="secondary">
                {repoInfo?.stars}
              </Text>
              <Text view="p-12" color="secondary">
                stars
              </Text>
            </div>

            <div className="info_block_parameters_watchers">
              <EyeIcon width={16} height={16} />
              <Text view="p-12" weight="bold" color="secondary">
                {repoInfo?.watchers}
              </Text>
              <Text view="p-12" color="secondary">
                watching
              </Text>
            </div>

            <div className="info_block_parameters_forks">
              <ForkIcon width={16} height={16} />
              <Text view="p-12" weight="bold" color="secondary">
                {repoInfo?.forks}
              </Text>
              <Text view="p-12" color="secondary">
                forks
              </Text>
            </div>
          </div>

          <div className="info_block_cont_and_lang">
            <div className="info_cont">
              <div className="contributor_title">
                <Text view="p-18" weight="bold">
                  Contributors
                </Text>
                <div className="contributor_circle">
                  <Text view="p-10" weight="bold" color="secondary-dark">
                    {repoInfo?.contributors?.length}
                  </Text>
                </div>
              </div>

              <div className="contributors">
                {repoInfo?.contributors?.map((contributor) => (
                  <Contributors key={contributor.username} contributor={contributor} />
                ))}
              </div>
            </div>

            <div className="info_lang">
              <div className="language_title">
                <Text view="p-18" weight="bold">
                  Languages
                </Text>
              </div>
              {repoInfo?.languages && <LanguagesInfo languages={repoInfo.languages} />}
            </div>
          </div>
        </div>

        <div className="readme_block">
          {readmeHtml && (
            <>
              <div className="readme_block_title">
                <Text view="p-12" weight="bold">
                  README.md
                </Text>
              </div>
              <div className="markdown_body" dangerouslySetInnerHTML={{ __html: readmeHtml }} />
              
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OneRepositorie;
