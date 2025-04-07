export interface Repo {
  id: number;
  name: string;
  description: string | null;
  owner: {
    avatar_url: string;
  };
}

export interface IGitHubStore {
  repos: Repo[];
  isLoading: boolean;
  error: string | null;
  fetchRepos(organizationName?: string): Promise<void>;
  totalRepos: number;
  getReposPage(page: number, perPage: number): Repo[];
}
