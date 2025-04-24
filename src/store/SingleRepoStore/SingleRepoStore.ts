import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';
import { RepoData, LanguageInfo, Contributor, GitHubContributor, GitHubUser } from './types';
import { removeSVGTags } from 'utils/removeSVGTags/removeSVGTags';
import { editLink } from 'utils/editLink/editLink';
import { sortContributors } from 'utils/sortCintributors';
const token = process.env.REACT_APP_API_TOKEN;

export default class SingleRepoStore {
  repoInfo: RepoData | null = null;
  readmeHtml = '';
  newLink = '';
  isLoading = false;
  error: string | null = null;
  private defaultOrganization = 'ktsstudio';

  constructor() {
    makeObservable(this, {
      repoInfo: observable,
      readmeHtml: observable,
      newLink: observable,
      isLoading: observable,
      error: observable,
      fetchRepoData: action,
      hasData: computed,
    });
  }

  get hasData(): boolean {
    return !!this.repoInfo;
  }

  async fetchRepoData(repoName: string, orgName?: string) {
    const organization = orgName || this.defaultOrganization;

    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.repoInfo = null;
      this.readmeHtml = '';
    });

    try {
      const [repoResponse, readmeResponse, languagesResponse, contributorsResponse] = await Promise.all([
        axios.get(`https://api.github.com/repos/${organization}/${repoName}`, {
          headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}` },
        }),
        this.fetchReadme(organization, repoName),
        this.fetchLanguages(organization, repoName),
        this.fetchContributors(organization, repoName),
      ]);

      runInAction(() => {
        this.newLink = editLink(repoResponse.data.homepage);
        this.repoInfo = {
          name: repoResponse.data.name,
          description: repoResponse.data.description,
          img: repoResponse.data.owner.avatar_url,
          stars: repoResponse.data.stargazers_count,
          forks: repoResponse.data.forks_count,
          language: repoResponse.data.language,
          topics: repoResponse.data.topics,
          link: repoResponse.data.homepage,
          watchers: repoResponse.data.watchers,
          languages: languagesResponse,
          contributors: contributorsResponse,
        };
        this.readmeHtml = readmeResponse;
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка загрузки данных репозитория';
        console.error('Ошибка:', error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  private async fetchReadme(orgName: string, repoName: string): Promise<string> {
    try {
      const response = await axios.get(`https://api.github.com/repos/${orgName}/${repoName}/readme`, {
        headers: { Accept: 'application/vnd.github.html', Authorization: `Bearer ${token}` },
      });
      return removeSVGTags(response.data);
    } catch {
      return '';
    }
  }

  private async fetchLanguages(orgName: string, repoName: string): Promise<LanguageInfo[]> {
    try {
      const response = await axios.get<Record<string, number>>(
        `https://api.github.com/repos/${orgName}/${repoName}/languages`,
        { headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}` } },
      );

      const totalBytes = Object.values(response.data).reduce((sum, bytes) => sum + bytes, 0);
      return Object.entries(response.data).map(([lang, bytes]) => ({
        name: lang,
        percent: parseFloat(((bytes / totalBytes) * 100).toFixed(1)),
      }));
    } catch {
      return [];
    }
  }

  private async fetchContributors(orgName: string, repoName: string): Promise<Contributor[]> {
    try {
      const response = await axios.get<GitHubContributor[]>(
        `https://api.github.com/repos/${orgName}/${repoName}/contributors`,
        { headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}` } },
      );

      const contributors = await Promise.all(
        response.data.map(async (contributor) => {
          try {
            const userResponse = await axios.get<GitHubUser>(`https://api.github.com/users/${contributor.login}`, {
              headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${token}` },
            });
            return {
              avatarUrl: contributor.avatar_url,
              username: contributor.login,
              name: userResponse.data.name,
              contributions: contributor.contributions,
            };
          } catch {
            return {
              avatarUrl: contributor.avatar_url,
              username: contributor.login,
              name: null,
              contributions: contributor.contributions,
            };
          }
        }),
      );

      return sortContributors(contributors);
    } catch {
      return [];
    }
  }
}
