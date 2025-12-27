import {
  user,
  session,
  account,
  verification,
} from "@/features/auth/db/auth-table.schema";
import { tasksTable as task } from "@/features/task/db/task-table.schema";

export const schema = {
  user,
  session,
  account,
  verification,
  task,
};
