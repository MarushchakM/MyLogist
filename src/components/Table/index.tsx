"use client"

import style from './Table.module.scss';
import { Button } from '../Button';
import { useSession } from 'next-auth/react';
import { LucideSquarePen } from 'lucide-react';
import { Spinner } from '../Spinner';
import { TableItem } from '../TableItem';

type ItemData = {
  label: string;
  type?: 'email' | 'phone';
  value: string;
}
type Data = {
  img: string;
  href: string;
  itemData: ItemData[];
};

type Props = {
  title: string;
  loader: boolean;
  data: Data[];
};
export const Table: React.FC<Props> = ({ title, loader, data }) => {
  const { data: session } = useSession();

  return (
    <div className={style.table}>
      <div className={style.heading}>
        <h2>{title}</h2>
        {session?.user.role === 'ADMIN' && <Button variant='icon' href='#'><LucideSquarePen /></Button>}
      </div>
      {loader ? <Spinner /> : (
        <ul className={style.tableList}>
          {data.map((item, index) => (
            <TableItem key={index} img={item.img} href={item.href} itemData={item.itemData} />
          ))}
        </ul>
      )}
    </div>
  )
};