"use client";

import {
  Calendar,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  LayoutDashboard,
  LogOut,
  LucideIcon,
  Settings,
  Sparkles,
  Target,
  Timer,
} from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn, formatTime } from "@/lib/utils";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type View =
  | "dashboard"
  | "matrix"
  | "calendar"
  | "habits"
  | "settings"
  | "completed"
  | "pomodoro";

interface NavItem {
  id: View;
  label: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "matrix", label: "Eisenhower Matrix", icon: Grid3X3 },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "pomodoro", label: "Pomodoro", icon: Timer },
  { id: "habits", label: "Habits", icon: Target },
  { id: "completed", label: "Completed", icon: CheckCircle2 },
  { id: "settings", label: "Settings", icon: Settings },
];

const PanelSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [view, setView] = useState("dashboard");
  const status = "running";
  const user = { name: "Misbah", email: "misbahx.id@gmail.com" };

  const logout = () => {};
  const navigate = useRouter();

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarOpen ? 260 : 72 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-screen bg-sidebar border-r border-sidebar-border flex flex-col relative z-30"
    >
      {/* Header */}
      <div
        className={cn(
          "h-16 w-full flex items-center justify-center px-4 border-b border-sidebar-border",
          { "justify-between": sidebarOpen }
        )}
      >
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">
              TaskFlow
            </span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="h-8 w-8 text-sidebar-foreground"
        >
          {sidebarOpen ? (
            <ChevronLeft className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = view === item.id;
          const Icon = item.icon;

          const button = (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setView(item.id)}
              className={cn(
                "w-full justify-start gap-3 h-11 transition-all duration-200",
                sidebarOpen ? "px-3" : "px-0 justify-center",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <Icon
                className={cn("h-5 w-5 shrink-0", isActive && "text-primary")}
              />
              {sidebarOpen && <span className="truncate">{item.label}</span>}
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute left-0 w-1 h-6 rounded-r-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </Button>
          );

          return sidebarOpen ? (
            <div key={item.id} className="relative">
              {button}
            </div>
          ) : (
            <Tooltip key={item.id} delayDuration={0}>
              <TooltipTrigger asChild>
                <div className="relative">{button}</div>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={10}>
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        {/* Pomodoro Status */}
        <div
          className={cn(
            "rounded-lg p-3 transition-all duration-200",
            status === "running" ? "bg-primary/10" : "bg-sidebar-accent"
          )}
        >
          <div className="flex items-center gap-2">
            <Timer
              className={cn(
                "h-4 w-4",
                status === "running"
                  ? "text-primary animate-pulse"
                  : "text-sidebar-foreground"
              )}
            />
            {sidebarOpen ? (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground capitalize">
                    Work
                  </span>
                  <span
                    className={cn(
                      "text-sm font-mono font-medium",
                      status === "running"
                        ? "text-primary"
                        : "text-sidebar-foreground"
                    )}
                  >
                    {formatTime(25)}
                  </span>
                </div>
              </div>
            ) : (
              <span className="text-xs font-mono font-medium text-sidebar-foreground">
                {Math.floor(25 / 60)}
              </span>
            )}
          </div>
        </div>

        {/* Today's Progress */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-sidebar-accent p-3"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Tasks</span>
              </div>
              <span className="font-medium text-sidebar-foreground">{2}</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-2">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Timer className="h-3.5 w-3.5" />
                <span>Pomodoros</span>
              </div>
              <span className="font-medium text-sidebar-foreground">{2}</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* User Section */}
      {user && (
        <div className="p-3 border-t border-sidebar-border">
          <div
            className={cn(
              "rounded-lg bg-sidebar-accent p-3",
              !sidebarOpen && "flex items-center justify-center"
            )}
          >
            {sidebarOpen ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-sidebar-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    logout();
                    toast.success("Logged out successfully");
                    navigate.push("/auth");
                  }}
                  className="w-full justify-start gap-2 h-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            ) : (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      logout();
                      toast.success("Logged out successfully");
                      navigate.push("/auth");
                    }}
                    className="h-9 w-9 rounded-full bg-primary/10 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <span className="text-sm font-medium text-primary">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()
                        .slice(0, 2)}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  <div className="text-sm">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-muted-foreground text-xs">
                      {user.email}
                    </p>
                    <p className="text-destructive text-xs mt-1">
                      Click to log out
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      )}
    </motion.aside>
  );
};

export default PanelSidebar;
