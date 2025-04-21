export interface Repo {
  id: number;
  name: string;
  description?: string | null ;
  stargazers_count: number;  
  updated_at: string;
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

