export interface LanguageInfo {
  name: string;
  percent: number;
}

export interface Contributor {
  avatarUrl: string;
  username: string;
  name: string | null;
  contributions: number;
}

export interface RepoData {
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

export interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
}

export interface GitHubUser {
  name: string | null;
}
