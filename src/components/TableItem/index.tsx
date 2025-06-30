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

export const TableItem: React.FC<Props> = ({ img, href, itemData }) => {
  return (
    <li className={style.item} >
      <ul className={style.dataList}>
        {itemData.map((el, index) => (
          <li key={index} className={style.dataListItem}>
            <h4 className={style.title}>{el.label}</h4>
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
          <a href="#">Перейти</a>
          <a href="#">Редагувати</a>
          <a href="#">Видалити</a>
        </div>
      </div>
    </li>
  )
}