import { useState, useEffect } from 'react';
import { GITHUB_USERNAME } from '../data/portfolioData';

export interface ActivityStatus {
  repoName: string;
  repoUrl: string;
  actionText: string;
  timeAgo: string;
}

export function useGitHubActivity() {
  const [activity, setActivity] = useState<ActivityStatus>({
    repoName: 'cortexiq-by-dnyl',
    repoUrl: `https://github.com/${GITHUB_USERNAME}/cortexiq-by-dnyl`,
    actionText: 'Push updates to CortexIQ intelligence suite',
    timeAgo: 'Recently active'
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const cached = localStorage.getItem('daniyal_github_activity_cache');
        if (cached) {
          const parsed = JSON.parse(cached);
          if (parsed.activity) {
            setActivity(parsed.activity);
          }
          if (parsed.timestamp && Date.now() - new Date(parsed.timestamp).getTime() < 10 * 60 * 1000) {
            setLoading(false);
            return;
          }
        }
      } catch {
        // Safe fallback for restricted storage
      }

      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=5`);
        if (!response.ok) throw new Error(`Events fetch failed with status ${response.status}`);
        const events = await response.json();
        
        // Find first push or repo event
        const pushEvent = Array.isArray(events) ? events.find((e: any) => 
          (e?.type === 'PushEvent' || e?.type === 'CreateEvent' || e?.type === 'WatchEvent') && e?.repo?.name
        ) : null;

        if (pushEvent?.repo?.name) {
          const repoName = pushEvent.repo.name.replace(`${GITHUB_USERNAME}/`, '');
          const repoUrl = `https://github.com/${pushEvent.repo.name}`;
          const type = pushEvent.type === 'PushEvent' ? 'Committed to' : 'Updated';
          const time = pushEvent.created_at ? new Date(pushEvent.created_at).toLocaleDateString() : 'Recently active';

          const nextActivity = {
            repoName,
            repoUrl,
            actionText: `${type} ${repoName}`,
            timeAgo: time
          };
          setActivity(nextActivity);
          try {
            localStorage.setItem('daniyal_github_activity_cache', JSON.stringify({
              activity: nextActivity,
              timestamp: new Date().toISOString()
            }));
          } catch {
            // ignore
          }
        } else {
          // Fallback to most recently updated repo
          const repoRes = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=1`);
          if (repoRes.ok) {
            const repos = await repoRes.json();
            if (Array.isArray(repos) && repos.length > 0 && repos[0]?.name) {
              const nextActivity = {
                repoName: repos[0].name,
                repoUrl: repos[0].html_url || `https://github.com/${GITHUB_USERNAME}/${repos[0].name}`,
                actionText: `Active on ${repos[0].name}`,
                timeAgo: 'Recently updated'
              };
              setActivity(nextActivity);
              try {
                localStorage.setItem('daniyal_github_activity_cache', JSON.stringify({
                  activity: nextActivity,
                  timestamp: new Date().toISOString()
                }));
              } catch {
                // ignore
              }
            }
          }
        }
      } catch (err) {
        // Silently keep default/cached active status
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  return { activity, loading };
}
