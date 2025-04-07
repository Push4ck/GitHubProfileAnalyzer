import { Repo } from "../types/github.ts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { ScrollArea } from "@/components/ui/scroll-area.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { BookMarked, GitFork, Star, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";

interface RepoListProps {
  repos: Repo[];
}

export const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  const [hoveredRepoId, setHoveredRepoId] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<string>("latest");

  const sortedRepos = useMemo(() => {
    return [...repos].sort((a, b) => {
      switch (sortOption) {
        case "latest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "alphabetical":
          return a.name.localeCompare(b.name);
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "forks":
          return b.forks_count - a.forks_count;
        default:
          return 0;
      }
    });
  }, [repos, sortOption]);

  if (!repos || repos.length === 0) {
    return (
      <Card className="shadow-lg border border-custom">
        <CardContent>
          <p>No repositories found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border border-custom">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>Repositories</CardTitle>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
            <SelectItem value="stars">Stars</SelectItem>
            <SelectItem value="forks">Forks</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] w-full rounded-md">
          <AnimatePresence>
            <ul className="space-y-4">
              {sortedRepos.map((repo) => (
                <motion.li
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  onMouseEnter={() => setHoveredRepoId(repo.id)}
                  onMouseLeave={() => setHoveredRepoId(null)}
                  className={`p-4 border border-custom rounded-md transition-colors cursor-pointer ${
                    hoveredRepoId === repo.id
                      ? "bg-accent-custom"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full"
                  >
                    <div className="flex items-center space-x-4">
                      <BookMarked className="h-6 w-6 text-primary-custom" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary-custom">
                          {repo.name}
                        </span>
                        <p className="text-sm text-secondary-custom">
                          {repo.description?.substring(0, 50)}...
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {repo.language && (
                        <Badge
                          variant="outline"
                          className="text-primary-custom border-primary-custom"
                        >
                          {repo.language}
                        </Badge>
                      )}
                      {repo.stargazers_count > 0 && (
                        <Badge
                          variant="secondary"
                          className="flex items-center"
                          style={{
                            backgroundColor: "#ffb86c1a",
                            color: "#ffb86c",
                          }}
                        >
                          <Star className="h-4 w-4 mr-1" />{" "}
                          {repo.stargazers_count}
                        </Badge>
                      )}
                      {repo.forks_count > 0 && (
                        <Badge
                          variant="secondary"
                          className="flex items-center"
                          style={{
                            backgroundColor: "#6272a41a",
                            color: "#6272a4",
                          }}
                        >
                          <GitFork className="h-4 w-4 mr-1" />{" "}
                          {repo.forks_count}
                        </Badge>
                      )}
                      <ChevronRight className="h-5 w-5 text-secondary-custom" />
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RepoList;
