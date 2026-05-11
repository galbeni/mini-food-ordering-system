"use client";
import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/features/auth/authSlice";
import { useLoginMutation } from "@/features/api/apiSlice";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { t } from "@/i18n";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      const response = await login({ email, password }).unwrap();

      dispatch(setCredentials(response));
      router.push("/restaurants");
    } catch {
      setError(t.auth.login.error);
    }
  }

  return (
    <>
      <AppHeader />
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t.auth.login.title}</CardTitle>
            <CardDescription>{t.auth.login.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">{t.auth.login.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t.auth.login.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
              {error ? <p className="text-sm text-red-600">{error}</p> : null}
              <Button
                className="w-full cursor-pointer"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? t.auth.login.submitting : t.auth.login.submit}
              </Button>
              <p className="text-center text-sm text-slate-600">
                {t.auth.login.noAccount}{" "}
                <Link className="font-medium underline" href="/register">
                  {t.auth.login.register}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
