'use client';

import { NavLink } from "../NavLink";
import { LucideChevronRight, LucideIcon } from "lucide-react";
import style from "./List.module.scss";
import { useState } from "react";
import clsx from "clsx";

type Link = {
  title: string;
  href: string;
  icon?: LucideIcon;
  children?: Link[];
}

type Props = {
  linksData: Link[];
}

export const List: React.FC<Props> = ({ linksData }) => {
  const [isOpenList, setIsOpenList] = useState<boolean>(false);

  const handleShowList = () => {
    setIsOpenList(!isOpenList);
  }

  return (
    <ul className={style.list}>
        {linksData.map((link, index) => (
          <li key={index} className={clsx(style.linkWrapper, {[style.linkWrapperOpen]: isOpenList})}>
            <div className={style.linkBlock}>
              <NavLink href={link.href} icon={link.icon}>
                {link.title}
              </NavLink>

              {link.children && link.children.length > 0 && (
                <LucideChevronRight
                  className={clsx(style.arrow, {[style.arrowRotate]: isOpenList})}
                  onClick={handleShowList}
                />
              )}

            </div>
            
            {link.children && link.children.length > 0 && (
              <List linksData={link.children} />
            )}
          </li>
        ))}
    </ul>
  )
}