'use client';

import { LucideIcon } from "lucide-react";
import Link from "next/link";
import style from "./NavLink.module.scss";
import { usePathname } from "next/navigation";
import clsx from "clsx";

type Props = {
  children: React.ReactNode;
  href: string;
  icon?: LucideIcon;
};

export const NavLink: React.FC<Props> = ({ children, href, icon: Icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/'); 

  return (
    <Link href={href} className={clsx(style.link, isActive && style.active)}> 
      {Icon && <Icon size={24} />}
      {children}
    </Link>
  );
};