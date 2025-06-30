"use client"

import styles from './Table.module.scss';
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
    <div className={styles.table}>
      <div className={styles.heading}>
        <h2>{title}</h2>
        {session?.user.role === 'ADMIN' && <Button variant='icon' href='#'><LucideSquarePen /></Button>}
      </div>
      {loader ? <Spinner /> : (
        <ul>
          {data.map((item, index) => (
            <TableItem key={index} img={item.img} href={item.href} itemData={item.itemData} />
          ))}
        </ul>
      )}
      
    </div>
    

  )
  // return (
  //   <table className={styles.table}>
  //     <thead>
  //       <tr className={styles.headRow}>
  //         {titles.map((title, index) => (
  //           <th key={index}>{title}</th>
  //         ))}
  //       </tr>
  //     </thead>

  //     <tbody>
  //       {rows.map((row, rowIndex) => (
  //         <tr key={rowIndex} className={styles.row}>
  //           {Object.values(row).map((cell, cellIndex) =>
  //             cell !== row.id ? <td key={cellIndex}>{cell}</td> : null
  //           )}
  //           <td className={styles.icon}>
  //             <Button href={`${path}/${row.id}`} variant='icon'>
  //               <LucideSquareArrowOutUpRight className={styles.icon} />
  //             </Button>
  //           </td>
  //         </tr>
  //       ))}
  //     </tbody>
  //   </table>
  // );
};