import { Option } from 'components/MultiDropdown';
export enum RepoTypes {
  ALL = 'all',
  PUBLIC = 'public',
  PRIVATE = 'private',
  FORKS = 'forks',
  SOURCES = 'sources',
  MEMBER = 'member',
}

export const repoTypeOptions: Option[] = [
  { key: RepoTypes.ALL, value: 'All' },
  { key: RepoTypes.PUBLIC, value: 'Public' },
  { key: RepoTypes.PRIVATE, value: 'Private' },
  { key: RepoTypes.FORKS, value: 'Forks' },
  { key: RepoTypes.SOURCES, value: 'Sources' },
  { key: RepoTypes.MEMBER, value: 'Member' },
];
