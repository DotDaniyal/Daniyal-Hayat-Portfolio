import { useState, useEffect } from 'react';
import { Project } from '../types';
import { PROJECTS, GITHUB_USERNAME } from '../data/portfolioData';

export function useGitHubRepos() {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const fetchGitHubData = async () => {
    setIsSyncing(true);
    setSyncError(null);
    try {
      const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Expected array of repositories from GitHub API');
      }
      
      // Merge live GitHub repo stats with our curated repository descriptions & features
      const curatedProjects = PROJECTS.map((proj) => {
        // match by repo name (case insensitive or exact)
        const liveRepo = data.find(
          (r: any) => r?.name && (
            r.name.toLowerCase() === proj.name.toLowerCase() ||
            r.name.toLowerCase().replace(/[-_]/g, '') === proj.name.toLowerCase().replace(/[-_]/g, '')
          )
        );

        if (liveRepo) {
          const liveHomepage = typeof liveRepo.homepage === 'string' && liveRepo.homepage.trim().length > 0 
            ? liveRepo.homepage.trim() 
            : undefined;

          return {
            ...proj,
            language: liveRepo.language || proj.language,
            stars: typeof liveRepo.stargazers_count === 'number' ? liveRepo.stargazers_count : proj.stars,
            forks: typeof liveRepo.forks_count === 'number' ? liveRepo.forks_count : proj.forks,
            updatedAt: liveRepo.updated_at || proj.updatedAt,
            githubUrl: liveRepo.html_url || proj.githubUrl,
            liveUrl: liveHomepage || proj.liveUrl,
            description: liveRepo.description || proj.description
          };
        }
        return proj;
      });

      const newProjects = data
        .filter((r: any) => r && !r.fork && r.name)
        .filter((r: any) => !PROJECTS.some(proj => 
          r.name.toLowerCase() === proj.name.toLowerCase() || 
          r.name.toLowerCase().replace(/[-_]/g, '') === proj.name.toLowerCase().replace(/[-_]/g, '')
        ))
        // Filter out repositories with empty or placeholder descriptions
        .filter((r: any) => r.description && r.description.trim().length > 0 && !r.description.toLowerCase().includes('no description provided'))
        .map((repo: any) => ({
          id: repo.name,
          name: repo.name,
          displayName: repo.name.replace(/[-_]/g, ' '),
          description: repo.description.trim(),
          technologies: repo.language ? [repo.language] : [],
          language: repo.language || "Unknown",
          githubUrl: repo.html_url,
          liveUrl: typeof repo.homepage === 'string' && repo.homepage.trim().length > 0 ? repo.homepage.trim() : undefined,
          category: "GitHub Repository",
          featured: false,
          iconName: "Github",
          features: [],
          stars: repo.stargazers_count || 0,
          forks: repo.forks_count || 0,
          updatedAt: repo.updated_at
        }));

      const updatedProjects = [...curatedProjects, ...newProjects].sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        const dateA = new Date(a.updatedAt || 0).getTime();
        const dateB = new Date(b.updatedAt || 0).getTime();
        return dateB - dateA;
      });

      setProjects(updatedProjects);
      setLastSynced(new Date().toLocaleTimeString());
      try {
        localStorage.setItem('daniyal_github_repos_cache', JSON.stringify({
          projects: updatedProjects,
          timestamp: new Date().toISOString()
        }));
      } catch (storageErr) {
        // Safe fallback for restricted/incognito storage
      }
    } catch (err: any) {
      console.warn('Using cached/static project data due to GitHub API limit:', err);
      setSyncError('Using curated repository state (GitHub API rate limit or offline)');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // Check localStorage cache first
    try {
      const cached = localStorage.getItem('daniyal_github_repos_cache');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.projects) {
          setProjects(parsed.projects);
          setLastSynced(new Date(parsed.timestamp).toLocaleTimeString());
        }
        // Skip immediate background refetch if cache is fresh (< 10 minutes)
        if (parsed.timestamp && Date.now() - new Date(parsed.timestamp).getTime() < 10 * 60 * 1000) {
          return;
        }
      }
    } catch (e) {
      // Safe fallback for restricted/incognito storage
    }
    // Fetch fresh live data in background
    fetchGitHubData();
  }, []);

  return {
    projects,
    isSyncing,
    lastSynced,
    syncError,
    refreshRepos: fetchGitHubData
  };
}
