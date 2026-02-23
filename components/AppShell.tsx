'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import Layout from '@/components/Layout';
import { Role } from '@/types';

const RoleContext = createContext<{ role: Role; setRole: (role: Role) => void } | null>(null);

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used inside AppShell');
  }
  return context;
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<Role>('Doctor');
  const value = useMemo(() => ({ role, setRole }), [role]);

  return (
    <RoleContext.Provider value={value}>
      <Layout role={role} onRoleChange={setRole}>
        {children}
      </Layout>
    </RoleContext.Provider>
  );
}
