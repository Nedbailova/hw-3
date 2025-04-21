import { useEffect, useState } from 'react';

interface RecentRepo {
  name: string;
  org: string;
  avatarUrl?: string;
  description?: string;
  stargazersCount?: number;
  updatedAt?: string;
}

const useRecentRepos = () => {
  const [recentRepos, setRecentRepos] = useState<RecentRepo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('recentRepos');
    if (saved) {
      setRecentRepos(JSON.parse(saved));
    }
  }, []);

  const addRecentRepo = (repo: RecentRepo) => {
    const updated = [
      repo,
      ...recentRepos.filter(r => !(r.name === repo.name && r.org === repo.org))
    ].slice(0, 6);
    
    setRecentRepos(updated);
    localStorage.setItem('recentRepos', JSON.stringify(updated));
  };

  return { recentRepos, addRecentRepo };
};

export default useRecentRepos;