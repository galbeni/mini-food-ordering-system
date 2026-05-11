"use client";
import Link from "next/link";
import { AppHeader } from "@/components/layout/app-header";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/features/api/apiSlice";
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

export default function RegisterPage() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    try {
      await register({ name, email, password }).unwrap();
      router.push("/login");
    } catch {
      setError(t.auth.register.error);
    }
  }

  return (
    <>
      <AppHeader />
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>{t.auth.register.title}</CardTitle>
            <CardDescription>{t.auth.register.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">{t.auth.register.name}</Label>
                <Input
                  id="name"
                  value={name}
                  placeholder={t.auth.register.namePlaceholder}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.auth.register.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  placeholder={t.auth.register.emailPlaceholder}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t.auth.register.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  placeholder={t.auth.register.passwordPlaceholder}
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
                {isLoading
                  ? t.auth.register.submitting
                  : t.auth.register.submit}
              </Button>
              <p className="text-center text-sm text-slate-600">
                {t.auth.register.hasAccount}{" "}
                <Link className="font-medium underline" href="/login">
                  {t.auth.register.login}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
