import { Repo, Commit, CommitActivity } from "../types/github.ts";

export async function fetchUserRepos(username: string): Promise<Repo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch repos for ${username}: ${response.status}`
    );
  }
  const data = await response.json();
  return data as Repo[];
}

export async function fetchUserCommits(
  username: string,
  repoName: string
): Promise<Commit[]> {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/commits`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch commits for ${username}/${repoName}: ${response.status}`
    );
  }
  const data = await response.json();
  return data as Commit[];
}

export async function fetchCommitActivity(
  username: string,
  repoName: string
): Promise<CommitActivity> {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repoName}/stats/participation`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch commit activity for ${username}/${repoName}: ${response.status}`
    );
  }
  const data = await response.json();

  if (!data || !data.all || !data.owner) {
    throw new Error(
      `Incomplete commit activity data for ${username}/${repoName}`
    );
  }

  return {
    all: data.all,
    owner: data.owner,
  };
}
