'use client';

import Link from "next/link";
import styles from './Header.module.scss';
import {LucideTramFront} from "lucide-react";
import { trucksPath, homePath } from "@/paths";
import { Button } from "../Button";
import { signOut } from "next-auth/react";

export const Header = () => {
  
  return (
    <nav className={styles.header}>
      <Link href={homePath()} className={styles.logo}>
        <LucideTramFront />
        <h1>MyLogist</h1>
      </Link>
      <Button href={trucksPath()} variant="secondary">
        Авто
      </Button>
      <Button onClick={() => signOut({ callbackUrl: '/sign-in' })}>
        Вийти
      </Button>
    </nav>
  )
}