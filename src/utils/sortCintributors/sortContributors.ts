import { Contributor } from "store/SingleRepoStore/types";

export const sortContributors = (contributors: Contributor[]): Contributor[] => {
    return contributors.sort((a, b) => {
      if (b.contributions !== a.contributions) return b.contributions - a.contributions;
      if (a.name && !b.name) return -1;
      if (!a.name && b.name) return 1;
      if (a.name && b.name) return a.name.localeCompare(b.name);
      return a.username.localeCompare(b.username);
    });
  }