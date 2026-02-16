"use client";

import {motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import { toast } from "sonner";

import { useSessionStore } from "@/features/auth/store/session.store";
import { authClient } from "@/lib/auth-client";

import ModalFormAddTask from "../modal-form-add-task";
import Navbar from "./navbar";
import PanelSidebar from "./panel-sidebar";

const PanelTemplate = ({ children }: { children: ReactNode }) => {
  const { session, clearSession } = useSessionStore();

  const router = useRouter();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    clearSession();
    toast.success("Logout successfully");
    router.push("/sign-in");
  };
  

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <PanelSidebar user={user} handleLogout={handleLogout} />
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Bar */}
        <Navbar user={user} handleLogout={handleLogout} />

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

        <ModalFormAddTask />
      </main>
    </div>
  );
};

export default PanelTemplate;
