import { useState, KeyboardEvent, useEffect } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { fetchUserRepos, fetchCommitActivity } from "./services/githubApi.ts";
import { RepoList } from "./components/RepoList.tsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Repo, CommitActivity } from "./types/github.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import { GithubIcon, Sun, Moon } from "lucide-react";
import { Separator } from "@/components/ui/separator.tsx";

function App() {
  const [username, setUsername] = useState("");
  const [repos, setRepos] = useState<Repo[]>([]);
  const [weeklyCommits, setWeeklyCommits] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSubmit = async () => {
    if (!username) return;
    setLoading(true);
    setError(null);

    try {
      const fetchedRepos = await fetchUserRepos(username);
      setRepos(fetchedRepos);

      if (fetchedRepos && fetchedRepos.length > 0) {
        const commitActivity: CommitActivity = await fetchCommitActivity(
          username,
          fetchedRepos[0].name
        );

        if (commitActivity?.all) {
          setWeeklyCommits(commitActivity.all);
        } else {
          setWeeklyCommits([]);
          setError("Commit Activity data is incomplete.");
        }
      } else {
        setWeeklyCommits([]);
        setError("No repositories found for this user.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        setError(
          "Failed to fetch data. Please check the username and try again. " +
            err.message
        );
      } else {
        console.error("An unknown error occurred:", err);
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="p-4 border-b border-custom flex justify-between items-center">
        <h1 className="text-2xl font-semibold">GitHub Profile Analyzer</h1>
        <button className="light-dark-toggle" onClick={toggleDarkMode}>
          {darkMode ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </header>

      <main className="flex-grow p-4 sm:p-6 lg:p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Card className="shadow-lg border border-custom">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <GithubIcon className="h-6 w-6 text-primary-custom" />
                <span>GitHub Profile Analyzer</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border border-custom"
                />
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-primary-custom"
                >
                  {loading ? "Analyze" : "Analyze"}
                </Button>
              </div>
              {error && (
                <Alert variant="destructive" className="bg-secondary-custom">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {loading && (
            <div className="space-y-4">
              <Card className="shadow-lg border border-custom">
                <CardContent>
                  <Skeleton className="h-60 w-full bg-accent-custom" />
                </CardContent>
              </Card>
              <Card className="shadow-lg border border-custom">
                <CardContent>
                  <Skeleton className="h-60 w-full bg-accent-custom" />
                </CardContent>
              </Card>
            </div>
          )}

          {!loading && repos.length > 0 && (
            <div className="space-y-6">
              <RepoList repos={repos} />
              <Separator className="border-custom" />
              <Card className="shadow-lg border border-custom">
                <CardHeader className="flex flex-row justify-between items-center">
                  <CardTitle>Commit Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={weeklyCommits.map((commits, index) => ({
                        week: index + 1,
                        commits,
                      }))}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        className="stroke-custom"
                      />
                      <XAxis dataKey="week" className="stroke-custom" />
                      <YAxis className="stroke-custom" />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="commits"
                        className="stroke-primary-custom"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <footer className="p-4 border-t border-custom text-center">
        <p>&copy; {new Date().getFullYear()} GitHub Analyzer</p>
        <p>
          <a
            href="https://push4ck.netlify.app/"
            className="hover:text-[var(--primary-dark)]"
          >
            Pushkar Sharma
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
