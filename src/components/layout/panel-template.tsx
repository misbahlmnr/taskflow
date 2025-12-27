"use client";

import { ReactNode } from "react";
import PanelSidebar from "./panel-sidebar";
import { Button } from "../ui/button";
import { Menu, Moon, Plus, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UserMenu } from "./user-menu";

const PanelTemplate = ({ children }: { children: ReactNode }) => {
  const theme = "dark";
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <PanelSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 lg:px-6 sticky top-0 z-20">
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
              onClick={() => {}}
              className="gap-2 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-md"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Task</span>
            </Button>

            {/* User Menu */}
            <UserMenu />
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 lg:p-6"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default PanelTemplate;
