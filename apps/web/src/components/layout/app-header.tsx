"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { t } from "@/i18n";
import type { RootState } from "@/store/store";

export const AppHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl w-full items-center justify-between px-4 py-4">
        <Link
          href="/restaurants"
          className="flex items-center gap-2 font-semibold"
        >
          <ShoppingBag className="h-5 w-5" />
          {t.app.name}
        </Link>
        <nav className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/orders">{t.nav.orders}</Link>
              </Button>
              <span className="hidden text-sm text-slate-600 sm:inline">
                {user.name}
              </span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {t.nav.logout}
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{t.nav.login}</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/register">{t.nav.register}</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
