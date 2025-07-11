import { LucideSquareArrowOutUpRight, LucideSquarePen, LucideTrash } from 'lucide-react';
import { Button } from '../Button';
import style from './Table.module.scss';

type ItemData = {
  label: string;
  type?: 'email' | 'phone';
  value: string;
}

type Props = {
  img: string;
  href: string;
  itemData: ItemData[];
}

export const TableItem: React.FC<Props> = ({ img, itemData }) => {
  return (
    <li className={style.item} >
      <ul className={style.dataList}>
        {itemData.map((el, index) => (
          <li key={index} className={style.dataListItem}>
            <h4 className={style.title}>{el.label}:</h4>
            <p className={style.description}>
              {el.type === 'phone' ? (
                <a href={`tel:${el.value}`}>{el.value}</a>
              ) : el.type === 'email' ? (
                <a href={`mailto:${el.value}`}>{el.value}</a>
              ) : (
                el.value
              )}
            </p>
          </li>
        ))}
      </ul>
      <div className={style.rightData}>
        <img src={img} alt="user" />
        <div className={style.action}>
          <Button variant='secondary' href='#'>Перейти <LucideSquareArrowOutUpRight size={20}/></Button>
          <Button variant='secondary' href='#'>Редагувати <LucideSquarePen size={20}/></Button>
          <Button variant='secondary' href='#'>Видалити <LucideTrash size={20}/></Button>
        </div>
      </div>
    </li>
  )
}