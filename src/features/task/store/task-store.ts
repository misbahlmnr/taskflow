import { create } from "zustand";

import { Task } from "../type";

// Extended type for modal state to handle "new" state safely
type ModalTask = Task | { id: "new" };

type TaskStore = {
    activeTask: ModalTask | null;
    
    openCreate: () => void;
    openTask: (task: Task) => void;
    closeTask: () => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
    activeTask: null,
    openCreate: () => set({ activeTask: { id: "new" } }),
    openTask: (task: Task) => set({ activeTask: task }),
    closeTask: () => set({ activeTask: null }),
}))