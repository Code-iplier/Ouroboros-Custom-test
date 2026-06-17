import { useNavigate, useLocation } from "react-router-dom";
import { MessageSquarePlus, User, Settings, LogOut, MessageSquare } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useChat } from "@/contexts/ChatContext";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getInitials } from "@/lib/utils";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { chats, activeChatId, createChat, setActiveChatId } = useChat();
  const { isMobile, setOpenMobile } = useSidebar();

  const closeMobileSidebar = () => {
    if (isMobile) setOpenMobile(false);
  };

  const handleNewChat = async () => {
    await createChat();
    closeMobileSidebar();
  };

  const handleChatClick = (chatId: string) => {
    setActiveChatId(chatId);
    navigate(`/dashboard/chat/${chatId}`);
    closeMobileSidebar();
  };

  const userName = user ? `${user.first_name} ${user.last_name}`.trim() : "User";
  const userIdentifier = user?.email ?? user?.phone_number ?? "";

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
            O
          </div>
          <span className="text-md font-semibold tracking-tight">Ouroboros App</span>
        </div>
      </SidebarHeader>

      <div className="px-3 pb-2">
        <Button onClick={handleNewChat} className="w-full justify-start gap-2" variant="outline">
          <MessageSquarePlus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      <SidebarContent>
        {/* Chat List */}
        <SidebarGroup>
          <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {chats.map((c) => (
                <SidebarMenuItem key={c.id}>
                  <SidebarMenuButton
                    isActive={activeChatId === c.id}
                    onClick={() => handleChatClick(c.id)}
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="truncate">{c.title || "Untitled Chat"}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {chats.length === 0 && (
                <div className="px-3 py-2 text-xs text-muted-foreground/60 italic">
                  No chats yet
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Core Links */}
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/dashboard/profile"}
                  onClick={() => {
                    navigate("/dashboard/profile");
                    closeMobileSidebar();
                  }}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={location.pathname === "/dashboard/settings"}
                  onClick={() => {
                    navigate("/dashboard/settings");
                    closeMobileSidebar();
                  }}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3 border-t">
        <div className="flex items-center gap-3 w-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{getInitials(userName)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0 flex flex-col leading-tight">
            <span className="truncate text-sm font-semibold">{userName}</span>
            <span className="truncate text-xs text-muted-foreground">{userIdentifier}</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="h-8 w-8 text-muted-foreground hover:text-destructive"
            title="Log out"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
