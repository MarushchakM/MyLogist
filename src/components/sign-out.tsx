// components/SignOutButton.tsx (приклад)
'use client'; // Це важливо для клієнтських компонентів у Next.js App Router

import { signOut } from 'next-auth/react';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      style={{ padding: '10px 20px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
    >
      Вийти
    </button>
  );
}