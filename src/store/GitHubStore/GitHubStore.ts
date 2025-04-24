import { makeObservable, observable, action, computed } from 'mobx';
import axios from 'axios';
import { IGitHubStore, Repo } from './types';
import { formatUpdateDate } from 'utils/formatUpdateDate';
const token = process.env.REACT_APP_API_TOKEN;


export default class GitHubStore implements IGitHubStore {
  repos: Repo[] = [];
  isLoading = false;
  error: string | null = null;
  currentOrganization: string = 'ktsstudio';
  selectedRepoTypes: string[] = ['all'];
  pageSize: number = 9;
  currentPage: number = 1;
  totalCount: number = 0;

  private static instance: GitHubStore | null = null;

  static getInstance() {
    if (!GitHubStore.instance) {
      GitHubStore.instance = new GitHubStore();
    }
    return GitHubStore.instance;
  }

  constructor() {
    makeObservable(this, {
      repos: observable,
      isLoading: observable,
      error: observable,
      currentOrganization: observable,
      selectedRepoTypes: observable,
      pageSize: observable,
      currentPage: observable,
      totalCount: observable,
      setOrganization: action,
      setRepoTypes: action,
      fetchRepos: action,
      getReposPage: action,
      totalRepos: computed,
      initFromQueryParams: action,
      getQueryParams: computed,
    });
  }

  initFromQueryParams(params: URLSearchParams) {
    const organization = params.get('org');
    const page = params.get('page');
    const types = params.get('types');

    if (organization) {
      this.currentOrganization = organization;
    }

    if (page) {
      const pageNum = parseInt(page, 10);
      if (!isNaN(pageNum) && pageNum > 0) {
        this.currentPage = pageNum;
      }
    }

    if (types) {
      this.selectedRepoTypes = types.split(',');
    }
  }

  get getQueryParams() {
    const params: Record<string, string> = {};

    if (this.currentOrganization && this.currentOrganization !== 'ktsstudio') {
      params.org = this.currentOrganization;
    }

    if (this.currentPage > 1) {
      params.page = this.currentPage.toString();
    }

    if (
      this.selectedRepoTypes.length > 0 &&
      !(this.selectedRepoTypes.length === 1 && this.selectedRepoTypes[0] === 'all')
    ) {
      params.types = this.selectedRepoTypes.join(',');
    }

    return params;
  }

  setRepoTypes = (types: string[]) => {
    const filteredTypes = types.includes('all') && types.length > 1 ? types.filter((type) => type !== 'all') : types;

    this.selectedRepoTypes = filteredTypes.length > 0 ? filteredTypes : ['all'];
    this.currentPage = 1;
    this.fetchRepos();
  };

  setOrganization = (org: string) => {
    this.currentOrganization = org;
    this.currentPage = 1;
    this.fetchRepos();
  };

  setPage = (page: number) => {
    this.currentPage = page;
    this.fetchRepos();
  };

  async fetchRepos() {
    this.isLoading = true;
    this.error = null;

    try {
      const response = await axios.get<Repo[]>(`https://api.github.com/orgs/${this.currentOrganization}/repos`, {
        params: {
          type: this.selectedRepoTypes.join(','),
          per_page: this.pageSize,
          page: this.currentPage,
        },
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${token}`
        },
      });

      this.repos = response.data.map((repo) => ({
        ...repo,
        updated_at: formatUpdateDate(repo.updated_at),
        stargazers_count: repo.stargazers_count || 0,
      }));

      const linkHeader = response.headers.link;
      if (linkHeader) {
        const matches = linkHeader.match(/page=(\d+)>; rel="last"/);
        if (matches && matches[1]) {
          this.totalCount = parseInt(matches[1], 10) * this.pageSize;
        }
      } else if (response.headers['x-total-count']) {
        this.totalCount = parseInt(response.headers['x-total-count'], 10);
      } else {
        this.totalCount = response.data.length;
      }
    } catch (error) {
      this.error = 'Failed to fetch repositories';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  get totalRepos() {
    return this.repos.length;
  }

  getReposPage(page: number, perPage: number): Repo[] {
    const startIndex = (page - 1) * perPage;
    return this.repos.slice(startIndex, startIndex + perPage);
  }

  get totalPages() {
    return Math.ceil(this.totalCount / this.pageSize);
  }
}
