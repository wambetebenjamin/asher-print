"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { LogIn, UserPlus } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import RecaptchaV2 from "@/components/RecaptchaV2";
import { zodResolver } from "@/lib/zod-resolver";
import { getRecaptchaToken } from "@/lib/recaptcha-client";
import {
  signInSchema,
  signUpSchema,
  type SignInInput,
  type SignUpInput,
} from "@/lib/schemas";

function GoogleButton({ googleEnabled }: { googleEnabled: boolean }) {
  if (!googleEnabled) {
    return (
      <p className="border border-hairline bg-section p-3 text-center text-sm">
        Google sign in activates once Google OAuth keys are added to the
        environment. Email sign in works right away.
      </p>
    );
  }
  return (
    <button
      type="button"
      onClick={() => signIn("google", { callbackUrl: "/products" })}
      className="btn-primary-zip w-full"
    >
      Continue with Google
    </button>
  );
}

export function SignInForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [needsV2, setNeedsV2] = useState(false);
  const [busy, setBusy] = useState(false);
  const onV2 = useCallback((_t: string) => undefined, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema as never),
    defaultValues: { email: "", password: "", recaptchaToken: "" },
  });

  async function onSubmit(values: SignInInput) {
    setError("");
    setBusy(true);
    try {
      const token = await getRecaptchaToken("signin");
      const check = await fetch("/api/recaptcha/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const checkData = (await check.json().catch(() => ({}))) as { needsV2?: boolean; error?: string };
      if (!check.ok) {
        if (checkData.needsV2) setNeedsV2(true);
        setError(checkData.error || "Verification failed. Please try again.");
        return;
      }
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (result?.error) {
        setError("Email or password is not correct. New here? Create an account first.");
        return;
      }
      router.push("/products");
      router.refresh();
    } catch {
      setError("Sign in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-label="Sign in">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <SectionHeading
          icon={<LogIn size={32} aria-hidden="true" />}
          title="Sign In"
          desc="Welcome back. Sign in to upload artwork faster and keep your details saved for quotes."
        />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 border border-hairline bg-white p-6">
          <div>
            <label htmlFor="si-email" className="mb-1.5 block font-bold text-heading">Email</label>
            <input id="si-email" type="email" autoComplete="email" className="input-zip" {...register("email")} />
            {errors.email?.message ? <p className="mt-1 text-sm text-primary">{errors.email.message}</p> : null}
          </div>
          <div>
            <label htmlFor="si-password" className="mb-1.5 block font-bold text-heading">Password</label>
            <input id="si-password" type="password" autoComplete="current-password" className="input-zip" {...register("password")} />
            {errors.password?.message ? <p className="mt-1 text-sm text-primary">{errors.password.message}</p> : null}
          </div>
          <RecaptchaV2 show={needsV2} onToken={onV2} />
          {error ? (
            <p role="alert" className="border border-primary bg-section p-3 text-sm font-bold text-heading">{error}</p>
          ) : null}
          <button type="submit" disabled={busy} className="btn-primary-zip solid w-full">
            {busy ? "Signing in..." : "Sign In"}
          </button>
          <GoogleButton googleEnabled={googleEnabled} />
          <p className="text-center text-sm">
            New to Asher Print?{" "}
            <Link href="/auth/signup" className="font-bold text-primary underline">
              Create an account
            </Link>
          </p>
          <p className="text-center text-xs text-muted">Protected by reCAPTCHA v3.</p>
        </form>
      </div>
    </section>
  );
}

export function SignUpForm({ googleEnabled }: { googleEnabled: boolean }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema as never),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      recaptchaToken: "",
    },
  });

  async function onSubmit(values: SignUpInput) {
    setError("");
    setDone("");
    setBusy(true);
    try {
      const token = await getRecaptchaToken("signup");
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, recaptchaToken: token }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; message?: string };
      if (!res.ok) {
        setError(data.error || "We could not create your account. Please try again.");
        return;
      }
      setDone(data.message || "Account created. Sign in to continue.");
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });
      if (!result?.error) {
        router.push("/products");
        router.refresh();
      }
    } catch {
      setError("We could not create your account. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <section aria-label="Create account">
      <div className="mx-auto max-w-xl px-4 sm:px-6">
        <SectionHeading
          icon={<UserPlus size={32} aria-hidden="true" />}
          title="Create Account"
          desc="One account for quotes, artwork uploads and reorders. We only ask for what we need to serve you, in line with the Kenya Data Protection Act, 2019."
        />
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 border border-hairline bg-white p-6">
          <div>
            <label htmlFor="su-name" className="mb-1.5 block font-bold text-heading">Full name</label>
            <input id="su-name" autoComplete="name" className="input-zip" {...register("name")} />
            {errors.name?.message ? <p className="mt-1 text-sm text-primary">{errors.name.message}</p> : null}
          </div>
          <div>
            <label htmlFor="su-email" className="mb-1.5 block font-bold text-heading">Email</label>
            <input id="su-email" type="email" autoComplete="email" className="input-zip" {...register("email")} />
            {errors.email?.message ? <p className="mt-1 text-sm text-primary">{errors.email.message}</p> : null}
          </div>
          <div>
            <label htmlFor="su-phone" className="mb-1.5 block font-bold text-heading">Phone (WhatsApp preferred)</label>
            <input id="su-phone" autoComplete="tel" placeholder="+254..." className="input-zip" {...register("phone")} />
            {errors.phone?.message ? <p className="mt-1 text-sm text-primary">{errors.phone.message}</p> : null}
          </div>
          <div>
            <label htmlFor="su-password" className="mb-1.5 block font-bold text-heading">Password</label>
            <input id="su-password" type="password" autoComplete="new-password" className="input-zip" {...register("password")} />
            {errors.password?.message ? <p className="mt-1 text-sm text-primary">{errors.password.message}</p> : null}
          </div>
          <div>
            <label htmlFor="su-confirm" className="mb-1.5 block font-bold text-heading">Confirm password</label>
            <input id="su-confirm" type="password" autoComplete="new-password" className="input-zip" {...register("confirmPassword")} />
            {errors.confirmPassword?.message ? (
              <p className="mt-1 text-sm text-primary">{errors.confirmPassword.message}</p>
            ) : null}
          </div>
          {error ? (
            <p role="alert" className="border border-primary bg-section p-3 text-sm font-bold text-heading">{error}</p>
          ) : null}
          {done ? (
            <p aria-live="polite" className="border border-hairline bg-section p-3 text-sm font-bold text-heading">{done}</p>
          ) : null}
          <button type="submit" disabled={busy} className="btn-primary-zip solid w-full">
            {busy ? "Creating account..." : "Create Account"}
          </button>
          <GoogleButton googleEnabled={googleEnabled} />
          <p className="text-center text-sm">
            Already registered?{" "}
            <Link href="/auth/signin" className="font-bold text-primary underline">
              Sign in
            </Link>
          </p>
          <p className="text-center text-xs text-muted">
            Protected by reCAPTCHA v3. By creating an account you agree to our{" "}
            <Link href="/legal/terms" className="underline">Terms</Link> and{" "}
            <Link href="/legal/privacy-policy" className="underline">Privacy Policy</Link>.
          </p>
        </form>
      </div>
    </section>
  );
}
