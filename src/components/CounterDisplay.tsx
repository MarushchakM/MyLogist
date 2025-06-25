'use client';

import { fetchTrucks, selectTrucks } from '@/lib/features/trucks/trucksSlice';
import { useAppSelector, useAppDispatch } from '@/lib/hooks'; 
import { useEffect } from 'react';

export function CounterDisplay() {
  
  const trucks = useAppSelector(selectTrucks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTrucks());
  }, [dispatch]);

  console.log('Дані вантажівок в компоненті:', trucks);

  return (
    <>123</>
  );
}