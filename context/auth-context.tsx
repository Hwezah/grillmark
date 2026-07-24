"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Session, SupabaseClient, User } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/client";

export type AuthModal = "login" | "signup" | "signout" | null;

type AuthResult = { error: string | null };

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /** True once Supabase env vars are present. */
  configured: boolean;
  /** Which auth modal is currently open (driven from anywhere via context). */
  modal: AuthModal;
  openModal: (modal: Exclude<AuthModal, null>) => void;
  closeModal: () => void;
  /** Opens sign-out when authed, otherwise login — used by the account icon. */
  toggleAccount: () => void;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<AuthResult>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const NOT_CONFIGURED_MESSAGE =
  "Accounts aren't switched on yet. Add your Supabase keys to enable sign-in.";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Create the browser client once. Null until env vars are provisioned.
  const [supabase] = useState<SupabaseClient | null>(() => createClient());
  const configured = supabase !== null;

  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(configured);
  const [modal, setModal] = useState<AuthModal>(null);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Auto-close the login/signup modal once a session is established.
  useEffect(() => {
    if (user) setModal((m) => (m === "login" || m === "signup" ? null : m));
  }, [user]);

  const openModal = useCallback(
    (next: Exclude<AuthModal, null>) => setModal(next),
    []
  );
  const closeModal = useCallback(() => setModal(null), []);
  const toggleAccount = useCallback(() => {
    setModal(user ? "signout" : "login");
  }, [user]);

  const signIn = useCallback<AuthContextValue["signIn"]>(
    async (email, password) => {
      if (!supabase) return { error: NOT_CONFIGURED_MESSAGE };
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error: error?.message ?? null };
    },
    [supabase]
  );

  const signUp = useCallback<AuthContextValue["signUp"]>(
    async (fullName, email, password) => {
      if (!supabase) return { error: NOT_CONFIGURED_MESSAGE };
      const emailRedirectTo =
        typeof window !== "undefined"
          ? `${window.location.origin}/auth/callback`
          : undefined;
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo,
        },
      });
      return { error: error?.message ?? null };
    },
    [supabase]
  );

  const signOut = useCallback(async () => {
    if (supabase) await supabase.auth.signOut();
    setModal(null);
  }, [supabase]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      session,
      loading,
      configured,
      modal,
      openModal,
      closeModal,
      toggleAccount,
      signIn,
      signUp,
      signOut,
    }),
    [
      user,
      session,
      loading,
      configured,
      modal,
      openModal,
      closeModal,
      toggleAccount,
      signIn,
      signUp,
      signOut,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an <AuthProvider>");
  return ctx;
}
