'use client';

import { Heading } from '@/components/Heading';
import style from './TruckHeading.module.scss';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useState } from 'react';
import { CreateForm } from '../CreateForm';

export const TruckHeading = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={style.headingBox}>
      <Heading title="Тягачі" description="Список тягачів" />
      <Button
        variant="primary"
        onClick={() => setIsOpen(true)}
      >
        Добавити авто
      </Button>
      {isOpen &&
        <Modal
          title='Добавити авто'
          onClose={() => setIsOpen(false)}
        >
          <CreateForm />
        </Modal>
      }
    </div>
  )
}