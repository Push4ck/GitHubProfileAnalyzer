import { Repo } from "../types/github";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BookMarked, GitFork, Star, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface RepoListProps {
  repos: Repo[];
}

export const RepoList: React.FC<RepoListProps> = ({ repos }) => {
  const [hoveredRepoId, setHoveredRepoId] = useState<number | null>(null);

  return (
    <Card className="shadow-lg border border-custom">
      <CardHeader>
        <CardTitle>Repositories</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[350px] w-full rounded-md">
          <AnimatePresence>
            <ul className="space-y-4">
              {repos.map((repo) => (
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
