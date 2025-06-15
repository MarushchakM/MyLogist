"use client"

import { LucideX } from 'lucide-react';
import { Button } from '../Button';
import style from './Modal.module.scss';
import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
  description?: string;
}

export const Modal: React.FC<Props> = ({children, onClose, title, description}) => {
  return (
    <div className={clsx(style.modal)}>
      <div className={style.content}>
        <Button
          variant="icon"
          className={style.closeBtn}
          onClick={onClose}
        >
          <LucideX className={style.close} />
        </Button>
        <h3>{title}</h3>
        <p>{description}</p>
        {children}
      </div>
    </div>
  );
};