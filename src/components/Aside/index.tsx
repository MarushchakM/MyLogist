"use client"

import Link from 'next/link';
import style from './aside.module.scss';
import { homePath, trailersPath, trucksPath, usersPath } from '@/paths';
import { LucideCar, LucideCaravan, LucideSquareUser, LucideUsers } from 'lucide-react';
import { Prisma } from '@prisma/client';
import { MenuItem } from '../MenuItem';
import { useSession } from 'next-auth/react';

type TrailerNumber = Prisma.TrailerGetPayload<{
  select: {
    id: true;
    number: true;
  };
}>;

type Props = {
  trailers: TrailerNumber[];
}

export const Aside: React.FC<Props> = () => {  
  const { data: session } = useSession();
  const user = session?.user;

  return (
    
    <aside className={style.aside}>
      <Link href={homePath()} className={style.logo}>
        <img className={style.logoIcon} src="./logo.png" alt="logo" />
        <h1>АГРОЛОГІСТИКА</h1>
      </Link>

      <Link href={homePath()} className={style.user}>
        {user && (
          <>{
            user.avatarUrl ?
              <img src={user.avatarUrl} alt='avatar' />
              : <LucideSquareUser size={40} />}
          <div className={style.heading}>
              <h3>{`${user.firstName} ${user.lastName}`}</h3>
              <span>{user.role}</span>
          </div>
          </>
        )}
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

          {user?.role === 'ADMIN' && (
            <MenuItem
              label="Працівники"
              href={usersPath()}
              icon={LucideUsers}
            />
          )}
        </ul>
        
      </nav>
    </aside>
  )
}