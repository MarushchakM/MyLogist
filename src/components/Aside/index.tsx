"use client"

import Link from 'next/link';
import style from './aside.module.scss';
import { homePath, trailersPath, trucksPath } from '@/paths';
import { LucideCar, LucideCaravan } from 'lucide-react';
import { MenuItem } from '../MenuItem';

export const Aside = () => {  
  return (
    <aside className={style.aside}>
      <Link href={homePath()} className={style.logo}>
        <img className={style.logoIcon} src="./logo.png" alt="logo" />
        <h1>АГРОЛОГІСТИКА</h1>
      </Link>
      
      <nav className={style.nav}>
        <ul className={style.list}>
          <MenuItem 
            label='Мої Авто' 
            href={trucksPath()} 
            icon={LucideCar} 
            subMenu={'trucks'} 
          />
          <MenuItem 
            label='Мої Причепи' 
            href={trailersPath()} 
            icon={LucideCaravan} 
            subMenu={'trailers'}
          />
        </ul>
        
      </nav>
    </aside>
  )
}