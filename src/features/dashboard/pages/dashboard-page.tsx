import MaxWidthWrapper from "@/components/max-width-wrapper";
import { auth } from "@/lib/auth";
import { formatFullDate } from "@/lib/formatter";
import { CheckCircle2, Clock, Flame, Target } from "lucide-react";
import { headers } from "next/headers";
import StatCard from "@/features/dashboard/components/stat-card";
import TaskList from "@/features/dashboard/components/task-list";
import MatrixOverview from "@/features/dashboard/components/matrix-overview";
import TodayHabits from "@/features/dashboard/components/today-habits";
import { getGreatingByTime } from "@/lib/utils";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return (
    <MaxWidthWrapper className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-xl lg:text-3xl font-bold">
          {getGreatingByTime()}, {user?.name}! 👋
        </h1>
        <div className="text-sm lg:text-base text-muted-foreground">
          {formatFullDate(new Date())}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-5">
        <StatCard
          Icon={CheckCircle2}
          label="Completed Task"
          value={"0"}
          bgColor={"bg-success/10"}
          color={"text-green-500"}
        />

        <StatCard
          Icon={Clock}
          label="Focus Time"
          value={"0m"}
          bgColor={"bg-primary/10"}
          color={"text-primary"}
        />

        <StatCard
          Icon={Target}
          label="Pomodoros"
          value={"0"}
          bgColor={"bg-accent/10"}
          color={"text-accent"}
        />

        <StatCard
          Icon={Flame}
          label="Best Streak"
          value={"0 days"}
          bgColor={"bg-destructive/10"}
          color={"text-destructive"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="md:col-span-2">
          <TaskList />
        </div>

        <div className="space-y-5">
          <MatrixOverview />
          <TodayHabits />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default DashboardPage;
