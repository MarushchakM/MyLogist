'use client';

import { Table } from "@/components/Table";
import { fetchUsers, selectFilteredUsers, selectUsersLoading } from "@/lib/features/users/usersSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { usersCreatePath } from "@/paths";
import { LucidePlus } from "lucide-react";
import { useEffect } from "react";

export const UserTable = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectFilteredUsers);
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
        { label: 'Телефон', type: 'phone', value: user.phone } as const,
      ],
    }
  )) || [];  

  const action = [{label: 'Додати працівника', link: usersCreatePath(), icon: LucidePlus}]

  return (<Table loader={isLoading} data={usersData} actions={action}/>);
}
