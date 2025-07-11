"use client"

import style from './Table.module.scss';
import { Button } from '../Button';
import { LucideIcon } from 'lucide-react';
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

type Action = {
  label: string;
  link: string;
  icon?: LucideIcon;
}

type Props = {
  loader: boolean;
  data: Data[];
  actions?: Action[];
};
export const Table: React.FC<Props> = ({ loader, data, actions }) => {
  return (
    <div className={style.table}>
      <div className={style.action}>
        {actions?.map((action, index) => (
          <Button key={index} href={action.link}>
            {action.label}
            {action.icon && <action.icon size={18} />}
          </Button>
        ))}
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