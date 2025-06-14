import { LucideSquareArrowOutUpRight } from 'lucide-react';
import styles from './Table.module.scss';
import { Button } from '../Button';

type Row = {
  [key: string]: string;
};

type Props = {
  titles: string[];
  rows: Row[];
  path: string;
};
export const Table: React.FC<Props> = ({ titles, rows, path }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.headRow}>
          {titles.map((title, index) => (
            <th key={index}>{title}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className={styles.row}>
            {Object.values(row).map((cell, cellIndex) =>
              cell !== row.id ? <td key={cellIndex}>{cell}</td> : null
            )}
            <td className={styles.icon}>
              <Button href={`${path}/${row.id}`} variant='icon'>
                <LucideSquareArrowOutUpRight className={styles.icon} />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};