import { LucideChevronRight, LucideIcon } from "lucide-react";
import { NavLink } from "../NavLink";
import clsx from "clsx";
import style from './MenuItem.module.scss';
import { useState } from "react";
import { SubMenu } from "../SubMenu";

type Props = {
  label: string;
  href: string;
  icon?: LucideIcon;
  subMenu?: 'trailers' | 'trucks';
}
export const MenuItem: React.FC<Props> = ({ label, href, icon, subMenu }) => {
  const [isOpenList, setIsOpenList] = useState<boolean>(false);
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);

  const handleShowList = () => {
    setIsOpenList(!isOpenList);
    if (!isOpenList && subMenu && !hasFetchedData) {
      setHasFetchedData(true);
    }
  };

  return (
    <li className={clsx(style.linkWrapper, {[style.linkWrapperOpen]: isOpenList})}>
      <div className={style.linkBlock}>
        <NavLink href={href} icon={icon}>
          {label}
        </NavLink>

        {subMenu && (
          <LucideChevronRight
            className={clsx(style.arrow, { [style.arrowRotate]: isOpenList })}
            onClick={handleShowList}
          />
        )}
      </div>

      {subMenu && isOpenList &&
        <SubMenu sectionId={subMenu} shouldFetch={hasFetchedData}/>
      }
    </li>
    
  )
}