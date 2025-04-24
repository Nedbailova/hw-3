import { makeObservable, observable, action, computed, runInAction } from 'mobx';
import axios from 'axios';
import { ContributorInfo, UserRepo, GithubRepoResponse } from './types';

const API_BASE = 'https://remarkable-kashata-cbd2de.netlify.app/.netlify/functions';

export default class ContributorStore {
  userInfo: ContributorInfo | null = null;
  userRepos: UserRepo[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      userInfo: observable,
      userRepos: observable,
      isLoading: observable,
      error: observable,
      fetchContributorData: action,
      hasData: computed,
    });
  }

  get hasData(): boolean {
    return !!this.userInfo;
  }

  async fetchContributorData(username: string) {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
      this.userInfo = null;
      this.userRepos = [];
    });

    try {
      const [userResponse, reposResponse] = await Promise.all([
        this.fetchUserInfo(username),
        this.fetchUserRepos(username),
      ]);

      runInAction(() => {
        this.userInfo = {
          login: userResponse.data.login,
          id: userResponse.data.id,
          avatarUrl: userResponse.data.avatar_url,
          htmlUrl: userResponse.data.html_url,
          name: userResponse.data.name,
          company: userResponse.data.company,
          blog: userResponse.data.blog,
          location: userResponse.data.location,
          email: userResponse.data.email,
          bio: userResponse.data.bio,
          publicRepos: userResponse.data.public_repos,
          followers: userResponse.data.followers,
          following: userResponse.data.following,
        };

        this.userRepos = reposResponse.data.map((repo: GithubRepoResponse) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          htmlUrl: repo.html_url,
          description: repo.description,
          stargazersCount: repo.stargazers_count,
          forksCount: repo.forks_count,
          language: repo.language,
          updatedAt: repo.updated_at,
        }));
      });
    } catch (error) {
      runInAction(() => {
        this.error = 'Error loading contributor data';
        console.error('Error:', error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  private async fetchUserInfo(username: string) {
    return axios.get(`${API_BASE}/github_proxy`, {
      params: {
        endpoint: 'user',
        username,
      },
    });
  }

  private async fetchUserRepos(username: string) {
    return axios.get(`${API_BASE}/github_proxy`, {
      params: {
        endpoint: 'user_repos',
        username,
        sort: 'updated',
        direction: 'desc',
        per_page: 100,
      },
    });
  }
}
