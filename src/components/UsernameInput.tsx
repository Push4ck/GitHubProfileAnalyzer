import { useState } from "react";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";

interface UsernameInputProps {
  onSubmit: (username: string) => void;
}

export function UsernameInput({ onSubmit }: UsernameInputProps) {
  const [username, setUsername] = useState("");

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Enter GitHub username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={() => onSubmit(username)}>Search</Button>
    </div>
  );
}
