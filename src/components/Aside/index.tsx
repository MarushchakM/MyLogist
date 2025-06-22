'use client';

import Link from 'next/link';
import style from './aside.module.scss';
import { homePath, trucksPath } from '@/paths';
import { List } from '../List';
import { LucideCar, LucideCaravan, LucideUser } from 'lucide-react';

import { Prisma } from '@prisma/client';

type TruckNumber = Prisma.TruckGetPayload<{
  select: {
    id: true;
    number: true;
  };
}>;

type Props = {
  trucks: TruckNumber[];
}

export const Aside: React.FC<Props> = ({ trucks }) => {  
  const listData = [
    {
      title: "Мої Авто",
      href: trucksPath(),
      icon: LucideCar, children: trucks.map(truck => (
        {title: truck.number, href: trucksPath() + '/' + truck.id }
      )),
    },
    { title: "Мої Причепи", href: "/1", icon: LucideCaravan },
    { title: "Мої Водії", href: "/2", icon: LucideUser },
  ];

  return (
    <div className={style.asideContainer}>
      <aside className={style.aside}>
        <Link href={homePath()} className={style.logo}>
          <img className={style.logoIcon} src="./logo.png" alt="logo" />
          <h1>АГРОЛОГІСТИКА</h1>
        </Link>
        
        <nav className={style.nav}>
          <List linksData={listData}/>
        </nav>
      </aside>
    </div>
    
  )
}