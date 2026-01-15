 "use client";

import Image from "next/image";
import Link from "next/link";
import {
  BarChart3,
  Inbox,
  KanbanSquare,
  LayoutDashboard,
  Settings,
  Zap,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export const navItems = [
  { label: "ダッシュボード", href: "/", icon: LayoutDashboard },
  { label: "バックログ", href: "/backlog", icon: Inbox },
  { label: "スプリント", href: "/sprint", icon: KanbanSquare },
  { label: "カンバン", href: "/kanban", icon: KanbanSquare },
  { label: "ベロシティ", href: "/velocity", icon: BarChart3 },
  { label: "自動化", href: "/automation", icon: Zap },
  { label: "設定", href: "/settings", icon: Settings },
];

type SidebarProps = {
  splitThreshold?: number;
};

export function Sidebar({ splitThreshold }: SidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  return (
    <aside className="sticky top-0 hidden min-h-screen w-60 flex-col border border-slate-200 bg-white p-4 shadow-sm lg:flex">
      <div className="border-b border-slate-200 pb-4">
        <Image
          src="/logo_holoplax.png"
          alt="Holoplax logo"
          width={180}
          height={56}
          className="h-auto w-full"
          priority
        />
      </div>
      <nav className="mt-4 flex flex-col gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-2 border px-3 py-2 text-sm transition hover:border-[#2323eb]/40 hover:bg-[#2323eb]/10 hover:text-[#2323eb] ${
              pathname === item.href
                ? "border-[#2323eb]/40 bg-[#2323eb]/10 text-[#2323eb]"
                : "border-transparent text-slate-700"
            }`}
          >
            <item.icon size={16} />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto border-t border-slate-200 pt-4 text-xs text-slate-600">
        {session?.user ? (
          <div className="space-y-2">
            <div className="truncate text-[11px] text-slate-500">Signed in</div>
            <div className="truncate text-sm font-semibold text-slate-900">
              {session.user.email ?? session.user.name ?? "User"}
            </div>
            <button
              onClick={() => signOut()}
              className="w-full border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 transition hover:border-red-300 hover:text-red-600"
            >
              ログアウト
            </button>
          </div>
        ) : (
          <Link
            href="/auth/signin"
            className="block w-full border border-slate-200 bg-white px-3 py-2 text-center text-xs text-slate-700 transition hover:border-[#2323eb]/60 hover:text-[#2323eb]"
          >
            ログイン
          </Link>
        )}
      </div>
    </aside>
  );
}
