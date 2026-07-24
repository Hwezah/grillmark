import type { Metadata } from "next";

import { AccountPanel } from "./account-panel";

export const metadata: Metadata = {
  title: "Account",
  description:
    "GrillMark account access — sign in, create an account, or sign out.",
};

export default function AccountPage() {
  return <AccountPanel />;
}
