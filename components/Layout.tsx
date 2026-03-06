'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BriefcaseBusiness, House, Stethoscope, Users } from 'lucide-react';
import { Role } from '@/types';

interface LayoutProps {
  role: Role;
  onRoleChange: (role: Role) => void;
  children: React.ReactNode;
}

const navItems = [
  { href: '/feed', label: 'Feed', icon: House },
  { href: '/jobs', label: 'Jobs', icon: BriefcaseBusiness },
  { href: '/directory', label: 'Directory', icon: Stethoscope }
];

export default function Layout({ role, onRoleChange, children }: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Users className="h-5 w-5 text-brand-600" />
            HealthNet Engage
          </div>
          <div className="flex items-center gap-3">
            <label htmlFor="role" className="text-sm text-slate-600">Role</label>
            <select
              id="role"
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm"
              value={role}
              onChange={(event) => onRoleChange(event.target.value as Role)}
            >
              <option>Doctor</option>
              <option>Organization</option>
              <option>Patient</option>
            </select>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6 md:px-6">
        <aside className="sticky top-20 hidden h-fit min-w-52 rounded-2xl border border-slate-200 bg-white p-4 md:block">
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                    active ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <main className="w-full pb-20 md:pb-0">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-slate-200 bg-white md:hidden">
        <div className="grid grid-cols-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                href={item.href}
                key={item.href}
                className={`flex flex-col items-center py-2 text-xs ${active ? 'text-brand-700' : 'text-slate-500'}`}
              >
                <Icon className="mb-1 h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
