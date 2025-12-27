import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ReactNode, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorPage from "./error";
import Loader from "nextjs-toploader";
import PanelTemplate from "@/components/panel-template";
import CustomSessionProvider from "@/features/auth/provider/custom-session-provider";

export default async function AppLayout({ children }: { children: ReactNode }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Loader color="#24a89d" />
      {session && (
        <CustomSessionProvider session={session}>
          <Suspense fallback={<Loader color="#24a89d" />}>
            <PanelTemplate>{children}</PanelTemplate>
          </Suspense>
        </CustomSessionProvider>
      )}
    </ErrorBoundary>
  );
}
