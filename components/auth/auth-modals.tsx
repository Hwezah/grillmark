"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, LogOut } from "lucide-react";

import { useAuth } from "@/context/auth-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Shared account modals (sign in / create account / sign out) driven entirely
 * by the auth context. Keeps the handoff's exact look; swaps the fake
 * sessionStorage logic for real Supabase calls.
 */
export function AuthModals() {
  const { modal, closeModal, openModal, signIn, signUp, signOut, user } =
    useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);

  // Reset transient form state whenever the active modal changes.
  useEffect(() => {
    setPassword("");
    setShowPass(false);
    setError("");
    setNotice("");
    setBusy(false);
  }, [modal]);

  const onLogin = async () => {
    setError("");
    setNotice("");
    if (!EMAIL_RE.test(email.trim()))
      return setError("Enter a valid email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    setBusy(true);
    const { error } = await signIn(email.trim(), password);
    setBusy(false);
    if (error) setError(error);
    // On success the context auto-closes the modal via onAuthStateChange.
  };

  const onSignup = async () => {
    setError("");
    setNotice("");
    if (!name.trim()) return setError("Please enter your name.");
    if (!EMAIL_RE.test(email.trim()))
      return setError("Enter a valid email address.");
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    setBusy(true);
    const { error } = await signUp(name.trim(), email.trim(), password);
    setBusy(false);
    if (error) return setError(error);
    // If email confirmation is on, no session arrives yet — guide the user.
    setNotice(
      "Account created. Check your email to confirm, then sign in."
    );
  };

  const EyeToggle = (
    <button
      type="button"
      onClick={() => setShowPass((s) => !s)}
      aria-label="Toggle password"
      className="absolute right-2 top-1/2 flex h-[30px] w-[30px] -translate-y-1/2 items-center justify-center text-clay"
    >
      {showPass ? (
        <EyeOff className="h-[18px] w-[18px]" strokeWidth={2} />
      ) : (
        <Eye className="h-[18px] w-[18px]" strokeWidth={2} />
      )}
    </button>
  );

  const feedback = (
    <>
      {error && (
        <div className="text-[13px] font-semibold text-brand">{error}</div>
      )}
      {notice && (
        <div className="text-[13px] font-semibold text-ember">{notice}</div>
      )}
    </>
  );

  return (
    <>
      {/* ------------------------------- LOGIN ------------------------------- */}
      <Dialog
        open={modal === "login"}
        onOpenChange={(o) => !o && closeModal()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign in</DialogTitle>
            <DialogDescription>
              Welcome back. Enter your details to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3.5">
            <label className="block">
              <Label className="mb-[7px]">Email</Label>
              <Input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <div className="mb-[7px] flex items-center justify-between">
                <Label>Password</Label>
                <span className="text-[12px] font-semibold text-brand">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="pr-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onLogin()}
                />
                {EyeToggle}
              </div>
            </label>
            {feedback}
            <Button className="mt-0.5 h-14" disabled={busy} onClick={onLogin}>
              {busy ? "Signing in…" : "Sign in"}
            </Button>
          </div>
          <div className="mt-5 text-center text-[13.5px] text-clay">
            New here?{" "}
            <button
              type="button"
              onClick={() => openModal("signup")}
              className="font-bold text-brand"
            >
              Create an account
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ------------------------------- SIGNUP ------------------------------ */}
      <Dialog
        open={modal === "signup"}
        onOpenChange={(o) => !o && closeModal()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create account</DialogTitle>
            <DialogDescription>
              Join GrillMark to save your box and order faster.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3.5">
            <label className="block">
              <Label className="mb-[7px]">Full name</Label>
              <Input
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="block">
              <Label className="mb-[7px]">Email</Label>
              <Input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="block">
              <Label className="mb-[7px]">Password</Label>
              <div className="relative">
                <Input
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="At least 6 characters"
                  className="pr-11"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSignup()}
                />
                {EyeToggle}
              </div>
            </label>
            {feedback}
            <Button className="mt-0.5 h-14" disabled={busy} onClick={onSignup}>
              {busy ? "Creating…" : "Create account"}
            </Button>
          </div>
          <div className="mt-5 text-center text-[13.5px] text-clay">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => openModal("login")}
              className="font-bold text-brand"
            >
              Sign in
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* ------------------------------ SIGN OUT ----------------------------- */}
      <Dialog
        open={modal === "signout"}
        onOpenChange={(o) => !o && closeModal()}
      >
        <DialogContent hideClose className="w-[388px]">
          <div className="mb-4 flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-[#fdeceb]">
            <LogOut className="h-[22px] w-[22px] text-brand" strokeWidth={2.1} />
          </div>
          <DialogHeader>
            <DialogTitle className="text-[21px]">Sign out?</DialogTitle>
            <DialogDescription className="mb-6">
              {user?.email ? (
                <>You&apos;re signed in as {user.email}. </>
              ) : null}
              Your saved grill box stays on this device.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-[11px]">
            <Button
              variant="outline"
              className="h-[46px] flex-1 text-[14.5px]"
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              className="h-[46px] flex-1 text-[14.5px]"
              onClick={signOut}
            >
              Sign out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
