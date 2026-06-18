import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  setTokens,
} from "@/utils/tokenStorage";
import { MOCK_USER, createMockTokenResponse } from "@/mocks/data";

export default function Login() {
  const { login, error, clearError } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      toast.error("Please enter both credentials.");
      return;
    }

    clearError();
    setIsLoading(true);
    try {
      await login({
        username: username.trim(),
        password: password,
      });
      toast.success("Successfully logged in!");
    } catch {
      toast.error("Failed to sign in. Verify credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    const tokenResponse = createMockTokenResponse(MOCK_USER);
    setTokens(
      tokenResponse.access_token,
      tokenResponse.refresh_token,
      tokenResponse.expires_in
    );
    const base = import.meta.env.BASE_URL || "/";
    window.location.href = `${base}#/dashboard`;
  };

  const isMockMode = import.meta.env.VITE_USE_MOCK_API === "true";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm border rounded-xl p-6 bg-card space-y-6 shadow-sm">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Sign In</h2>
          <p className="text-sm text-muted-foreground">
            Access your custom application dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label
              htmlFor="login-username"
              className="text-xs font-semibold text-muted-foreground"
            >
              Username
            </label>
            <input
              id="login-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username or Phone"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="login-password"
              className="text-xs font-semibold text-muted-foreground"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="h-9 w-full rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-2.5 rounded-md">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full h-9" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {isMockMode && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="secondary"
              className="w-full h-9"
              onClick={handleDemoLogin}
            >
              Continue as Demo User
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
