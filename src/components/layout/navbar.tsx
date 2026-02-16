import { User } from "better-auth";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Plus, Sun } from "lucide-react";

import { useTaskStore } from "@/features/task/store/task-store";

import { Button } from "../ui/button";
import { UserMenu } from "./user-menu";

const Navbar = ({ user, handleLogout }: { user: User | undefined, handleLogout: () => void }) => {
    const { openCreate } = useTaskStore();
    
    const theme = "dark";

    return (
      <nav className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {}}
            className="text-muted-foreground hover:text-foreground"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </motion.div>
            </AnimatePresence>
          </Button>

          {/* Add Task Button */}
          <Button
            onClick={openCreate}
            className="gap-2 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-md"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Task</span>
          </Button>

          {/* User Menu */}
          <UserMenu user={user} handleLogout={handleLogout} />
        </div>
      </nav>
    );
}

export default Navbar;