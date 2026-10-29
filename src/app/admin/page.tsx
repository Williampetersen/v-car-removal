import type { Metadata } from "next";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { MAX_RECIPIENTS, getRecipients, storageStatus } from "@/lib/recipients";
import { site } from "@/lib/site";
import { AdminLogin } from "./AdminLogin";
import { RecipientsManager } from "./RecipientsManager";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const signedIn = await isAdmin();

  return (
    <div className="min-h-[70vh] bg-slate-100 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-xl px-4">
        {signedIn ? (
          <RecipientsManager
            initial={await getRecipients()}
            max={MAX_RECIPIENTS}
            storage={storageStatus()}
            sender={process.env.CONTACT_FROM_EMAIL || `${site.name} <${site.email}>`}
          />
        ) : (
          <AdminLogin configured={adminConfigured()} defaultEmail={site.email} />
        )}
      </div>
    </div>
  );
}
