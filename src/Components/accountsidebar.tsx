import Link from "next/link";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { clearUser } from "@/slices/userSlice";
import { clearToken } from "@/slices/tokenSlice";
import { resetCartCount } from "@/slices/loginUserSlice";
import { clearCart } from "@/slices/cartSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { accountNavLinks, AccountNavIcon } from "@/utils/accountNav";

export default function AccountSideBar() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const currentPath = router.pathname;

  const logout = () => {
    dispatch(clearUser());
    dispatch(clearToken());
    dispatch(resetCartCount());
    dispatch(clearCart());
    toast.success("Logged out successfully");
  };

  return (
    <nav
      className="overflow-hidden rounded-2xl border"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
        boxShadow: "var(--shadow-card)",
      }}
      aria-label="Account menu"
    >
      <ul className="flex flex-col py-2">
        {accountNavLinks.map((item) => {
          const isActive = currentPath === item.href;
          return (
            <li key={item.href + item.label}>
              <Link
                href={item.href}
                className={`flex min-h-[48px] items-center gap-3 px-4 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--color-primary)] ${
                  isActive
                    ? "border-l-4 border-[var(--color-primary)] bg-[var(--color-primary-light)]/50 font-semibold"
                    : "border-l-4 border-transparent hover:bg-[var(--color-bg)]"
                }`}
                style={{ color: isActive ? "var(--color-primary)" : "var(--color-charcoal)" }}
                aria-current={isActive ? "page" : undefined}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: isActive ? "var(--color-primary-light)" : "var(--color-bg)" }}
                >
                  <AccountNavIcon label={item.label} />
                </span>
                <span className="text-sm">{item.label}</span>
                <svg width="12" height="12" className="ml-auto opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </Link>
            </li>
          );
        })}
        <li className="mt-1 border-t border-[var(--color-border)] pt-2">
          <Link
            href="/"
            onClick={logout}
            className="flex min-h-[48px] cursor-pointer items-center gap-3 px-4 py-3 text-red-600 transition-colors duration-200 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-400"
            aria-label="Sign out"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-100">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
              </svg>
            </span>
            <span className="text-sm font-medium">Sign out</span>
            <svg width="12" height="12" className="ml-auto opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
