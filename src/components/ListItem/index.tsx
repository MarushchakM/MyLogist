import { LucideChevronRight, LucideIcon } from "lucide-react"
import { List } from "../List"
import { NavLink } from "../NavLink"
import clsx from "clsx"
import style from "./ListItem.module.scss";
import { useState } from "react";

type Link = {
  title: string;
  href: string;
  icon?: LucideIcon;
  children?: Link[];
}

type Props = {
  linkData: Link;
}

export const ListItem: React.FC<Props> = ({ linkData }) => {
  const [isOpenList, setIsOpenList] = useState<boolean>(false);
  
    const handleShowList = () => {
      setIsOpenList(!isOpenList);
  }
  
  return (
    <li className={clsx(style.linkWrapper, {[style.linkWrapperOpen]: isOpenList})}>
      <div className={style.linkBlock}>
        <NavLink href={linkData.href} icon={linkData.icon}>
          {linkData.title}
        </NavLink>

        {linkData.children && linkData.children.length > 0 && (
          <LucideChevronRight
            className={clsx(style.arrow, {[style.arrowRotate]: isOpenList})}
            onClick={handleShowList}
          />
        )}

      </div>
      
      {linkData.children && linkData.children.length > 0 && (
        <List linksData={linkData.children} />
      )}
    </li>
  )
  
}