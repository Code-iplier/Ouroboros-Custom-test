import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 overflow-auto p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Student Profile</h2>
        <p className="text-sm text-muted-foreground">
          Manage your educational profile and contact information.
        </p>
      </div>

      <div className="border rounded-lg p-6 bg-card max-w-xl space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Profile Information</h3>
        {user ? (
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground block">First Name</span>
              <span className="font-medium">{user.first_name || "N/A"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Last Name</span>
              <span className="font-medium">{user.last_name || "N/A"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Username</span>
              <span className="font-medium">{user.username || "N/A"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Email</span>
              <span className="font-medium">{user.email || "N/A"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Phone</span>
              <span className="font-medium">{user.phone_number || "N/A"}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Profile Completed</span>
              <span className="font-medium">{user.profile_completed ? "Yes" : "No"}</span>
            </div>
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">No profile data available.</div>
        )}
      </div>
    </div>
  );
}
