import { redirect } from "next/navigation";

import { auth } from "../../../lib/auth";
import { AdminShell } from "../../../components/admin/shell";

interface AdminDashboardLayoutProps {
  children: React.ReactNode;
}

export default async function AdminDashboardLayout({ children }: AdminDashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/admin/login");
  }

  return <AdminShell userEmail={session.user.email}>{children}</AdminShell>;
}
