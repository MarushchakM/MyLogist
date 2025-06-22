'use client';

import { LucideIcon } from "lucide-react";
import style from "./List.module.scss";
import { ListItem } from "../ListItem";

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
  return (
    <ul className={style.list}>
        {linksData.map((link, index) => (
          <ListItem key={index} linkData={link} />
        ))}
    </ul>
  )
}