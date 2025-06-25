"use client"

import Link from 'next/link';
import style from './aside.module.scss';
import { homePath, trailersPath, trucksPath } from '@/paths';
import { List } from '../List';
import { LucideCar, LucideCaravan, LucideUser } from 'lucide-react';

import { Prisma } from '@prisma/client';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchTrucks, selectTruckNumbersAndIds } from '@/lib/features/trucks/trucksSlice';
import { useEffect } from 'react';
import { fetchTrailers, selectTrailersNumbersAndIds } from '@/lib/features/trailers/trailersSlice';

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
  const trucks = useAppSelector(selectTruckNumbersAndIds);
  const trailers = useAppSelector(selectTrailersNumbersAndIds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTrucks());
    dispatch(fetchTrailers());
  }, [dispatch]);
  
  const listData = [
    {
      title: "Мої Авто",
      href: trucksPath(),
      icon: LucideCar, children: trucks?.map(truck => (
        {title: truck.number, href: trucksPath() + '/' + truck.id }
      )),
    },
    {
      title: "Мої Причепи",
      href: trailersPath(),
      icon: LucideCaravan,
      children: trailers?.map(trailer => (
        {title: trailer.number, href: trailersPath() + '/' + trailer.id }
      )),
    },
    { title: "Мої Водії", href: "/2", icon: LucideUser },
  ];

  return (
    <aside className={style.aside}>
      <Link href={homePath()} className={style.logo}>
        <img className={style.logoIcon} src="./logo.png" alt="logo" />
        <h1>АГРОЛОГІСТИКА</h1>
      </Link>
      
      <nav className={style.nav}>
        <List linksData={listData}/>
      </nav>
    </aside>
  )
}