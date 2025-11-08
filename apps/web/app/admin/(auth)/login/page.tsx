import Link from "next/link";

import { LoginForm } from "../../../../components/admin/login-form";

export const metadata = {
  title: "Admin Login — PM BY MADI"
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen bg-brand-powder">
      <div className="mx-auto flex w-full max-w-lg flex-col justify-center px-6 py-12">
        <div className="mb-10 text-center">
          <Link href="/" className="font-serif text-3xl text-brand-chocolate">
            PM BY MADI
          </Link>
          <p className="mt-3 text-sm text-brand-cocoa/70">Admin access</p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-xs text-brand-cocoa/60">
          © {new Date().getFullYear()} PM BY MADI. Confidential.
        </p>
      </div>
    </div>
  );
}
