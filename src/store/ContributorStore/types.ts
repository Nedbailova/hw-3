export interface ContributorInfo {
    login: string;
    id: number;
    avatarUrl: string;
    htmlUrl: string;
    name: string | null;
    company: string | null;
    blog: string | null;
    location: string | null;
    email: string | null;
    bio: string | null;
    publicRepos: number;
    followers: number;
    following: number;
  }
  
  export interface UserRepo {
    id: number;
    name: string;
    htmlUrl: string;
    description: string | null;
    stargazersCount: number;
    forksCount: number;
    language: string | null;
    updatedAt: string;
  }

  export interface GithubRepoResponse {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
  }
  