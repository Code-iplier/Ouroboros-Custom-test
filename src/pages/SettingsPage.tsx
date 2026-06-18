import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-sm text-muted-foreground">
          Manage your custom project configurations and preferences.
        </p>
      </div>

      <div className="border rounded-lg p-4 bg-card max-w-xl space-y-4">
        <h3 className="font-semibold text-lg">Appearance</h3>
        <p className="text-sm text-muted-foreground">
          Select or toggle your application's light/dark mode configuration.
        </p>

        <div className="flex gap-2">
          <Button
            variant={theme === "light" ? "default" : "outline"}
            onClick={() => setTheme("light")}
          >
            Light Mode
          </Button>
          <Button
            variant={theme === "dark" ? "default" : "outline"}
            onClick={() => setTheme("dark")}
          >
            Dark Mode
          </Button>
        </div>
      </div>
    </div>
  );
}
