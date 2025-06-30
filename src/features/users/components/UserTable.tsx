'use client';

import { Table } from "@/components/Table";
import { fetchUsers, selectUsersLoading, selectUsersPrev } from "@/lib/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";

export const UserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersPrev);
  const isLoading = useAppSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  
  const usersData = users?.map(user => (
    {
      title: `${user.firstName} ${user.lastName}`,
      img: user.avatarUrl || './user.jpg',
      href: user.id,
      itemData: [
        { label: 'Працівник', value: `${user.firstName} ${user.lastName}` },
        { label: 'Посада', value: user.role },
        { label: 'Емейл', type: 'email', value: user.email } as const,
        { label: 'Телефон', type: 'phone', value: user.phoneNumber, } as const,
      ],
    }
  )) || [];  

  return (<Table title="Працівники" loader={isLoading} data={usersData}/>);
}