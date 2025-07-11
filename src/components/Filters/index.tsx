import { Button } from '../Button';
import style from './Filters.module.scss';

type Props = {
  buttons: {
    label: string
    onChange: () => void;
    count?: number;
  }[];
  
}

export const Filters: React.FC<Props> = ({buttons}) => {
  return (
    <div className={style.filters}>
      {buttons.map((button, index) => (
        <Button key={index} onClick={button.onChange}>{button.label} <b>{button.count}</b></Button>
      ))}
    </div>
  )
}