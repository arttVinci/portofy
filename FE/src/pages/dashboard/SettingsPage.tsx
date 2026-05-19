import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  SaveIcon,
  Loader2Icon,
  UserIcon,
  LockIcon,
  ShieldCheckIcon,
  AlertTriangleIcon,
} from "lucide-react";

import { useCurrent } from "@/hooks/queries/user/useCurrent";
import { useUpdateUser } from "@/hooks/mutations/auth/useUpdateUser";
import { useToast } from "@/hooks/ui/useToast";
import { ApiError } from "@/api/apiError";
import { STORAGE_KEYS } from "@/config/api.config";

export default function SettingsPage() {
  const { toast, renderToasts } = useToast();
  const { data: currentUser, isLoading } = useCurrent({ enabled: true });

  // ── Account form state ──
  const [username, setUsername] = useState("");
  const [isDirtyUsername, setIsDirtyUsername] = useState(false);

  // ── Password form state ──
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isOAuthUser = currentUser?.auth_provider === "google";

  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username);
    }
  }, [currentUser]);

  const updateUserMutation = useUpdateUser({
    onSuccess: () => {
      toast("success", "Berhasil", "Pengaturan akun berhasil diperbarui");
      setIsDirtyUsername(false);
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal", error.message);
    },
  });

  const handleSaveUsername = () => {
    if (!username || username.length < 3) {
      toast("error", "Gagal", "Username minimal 3 karakter");
      return;
    }
    updateUserMutation.mutate({ username });
  };

  const handleSavePassword = () => {
    if (newPassword.length < 8) {
      toast("error", "Gagal", "Password minimal 8 karakter");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast("error", "Gagal", "Password tidak cocok");
      return;
    }
    updateUserMutation.mutate({ password: newPassword });
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    window.location.href = "/auth/login";
  };

  const isSaving = updateUserMutation.isPending;

  if (isLoading || !currentUser) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {renderToasts()}

      {/* ── Page Header ── */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola pengaturan akun dan keamanan kamu
        </p>
      </div>

      <Separator />

      {/* ── Account Info Section ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
            <UserIcon className="size-4 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Informasi Akun</h2>
            <p className="text-xs text-muted-foreground">
              Update username dan email akun
            </p>
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 space-y-4">
          {/* Email (read-only) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">
              Email
            </label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={currentUser.email ?? ""}
                disabled
                className="flex-1 rounded-lg border bg-muted/50 px-3 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
              />
              {isOAuthUser && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-xs font-medium text-blue-400 shrink-0">
                  <svg className="size-3" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Google
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Email tidak dapat diubah
              {isOAuthUser && " — terhubung via Google"}
            </p>
          </div>

          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground select-none pointer-events-none">
                  portofy.net/
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(
                      e.target.value.replace(/[^a-zA-Z0-9_-]/g, "")
                    );
                    setIsDirtyUsername(true);
                  }}
                  className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                  style={{ paddingLeft: 88 }}
                />
              </div>
              <Button
                size="sm"
                onClick={handleSaveUsername}
                disabled={
                  !isDirtyUsername ||
                  isSaving ||
                  username === currentUser.username
                }
                className="gap-1.5 shrink-0 cursor-pointer"
              >
                {isSaving ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <SaveIcon className="size-3.5" />
                )}
                Simpan
              </Button>
            </div>
            {username !== currentUser.username && username.length > 0 && (
              <p className="text-xs text-muted-foreground">
                URL portfolio baru:{" "}
                <span className="text-foreground font-medium">
                  portofy.net/{username}
                </span>
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── Password Section ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10">
            <LockIcon className="size-4 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Keamanan</h2>
            <p className="text-xs text-muted-foreground">
              Ubah password akun kamu
            </p>
          </div>
        </div>

        {isOAuthUser ? (
          <div className="rounded-xl border bg-card p-5">
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center size-10 rounded-lg bg-blue-500/10 shrink-0 mt-0.5">
                <ShieldCheckIcon className="size-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">
                  Autentikasi via Google
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Akun kamu terhubung melalui Google OAuth. Password dikelola
                  oleh Google dan tidak dapat diubah di sini. Untuk mengubah
                  password, silakan ke pengaturan akun Google kamu.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border bg-card p-5 space-y-4">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Password Baru</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Konfirmasi Password Baru
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Ulangi password baru"
                className="w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
              />
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-xs text-destructive flex items-center gap-1">
                  <AlertTriangleIcon className="size-3" />
                  Password tidak cocok
                </p>
              )}
              {confirmPassword &&
                newPassword === confirmPassword &&
                newPassword.length >= 8 && (
                  <p className="text-xs text-emerald-500 flex items-center gap-1">
                    <ShieldCheckIcon className="size-3" />
                    Password cocok
                  </p>
                )}
            </div>

            <div className="flex justify-end pt-1">
              <Button
                size="sm"
                onClick={handleSavePassword}
                disabled={
                  isSaving ||
                  !newPassword ||
                  newPassword.length < 8 ||
                  newPassword !== confirmPassword
                }
                className="gap-1.5 cursor-pointer"
              >
                {isSaving ? (
                  <Loader2Icon className="size-3.5 animate-spin" />
                ) : (
                  <LockIcon className="size-3.5" />
                )}
                Ubah Password
              </Button>
            </div>
          </div>
        )}
      </section>

      <Separator />

      {/* ── Danger Zone ── */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center size-8 rounded-lg bg-destructive/10">
            <AlertTriangleIcon className="size-4 text-destructive" />
          </div>
          <div>
            <h2 className="text-base font-semibold">Zona Berbahaya</h2>
            <p className="text-xs text-muted-foreground">
              Tindakan yang tidak dapat dibatalkan
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-destructive/20 bg-card p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold">Logout</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Keluar dari sesi saat ini
              </p>
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleLogout}
              className="gap-1.5 cursor-pointer shrink-0"
            >
              Logout
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
