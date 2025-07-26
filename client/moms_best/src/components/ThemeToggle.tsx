import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeProvider";
import { MoonStarIcon, Sun } from "lucide-react";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      variant="ghost"
    >
      {theme === "dark" ? <Sun /> : <MoonStarIcon />}
    </Button>
  );
}
