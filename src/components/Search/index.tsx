import { LucideSearch } from 'lucide-react';
import style from './Search.module.scss';

type Props = {
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Search: React.FC<Props> = ({placeholder, value, onChange}) => {
  return (
    <div className={style.searchBlock}>
      <LucideSearch size={24} className={style.icon} />
      <input
        className={style.search}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>

  )
}