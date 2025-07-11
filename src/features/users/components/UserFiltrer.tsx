import { Filters } from "@/components/Filters"
import { selectUsers, setRoleFilter } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";
import { Role } from "@prisma/client";
import { useDispatch } from "react-redux";

export const UserFilter = () => {
  const dispatch = useDispatch();
  const users = useAppSelector(selectUsers);

  function usersCounter(role?: Role | null) {
    if (!role) return users?.length;

    return users?.filter(user => user.role === role).length;
  }

  const actions = [
    { label: 'Всі', onChange: () => dispatch(setRoleFilter(null)), count: usersCounter() },
    { label: 'Водії', onChange: () => dispatch(setRoleFilter(Role.DRIVER)), count: usersCounter(Role.DRIVER)},
    { label: 'Диспетчери', onChange: () => dispatch(setRoleFilter(Role.DISPATCHER)), count: usersCounter(Role.DISPATCHER) },
    { label: 'Адміни', onChange: () => dispatch(setRoleFilter(Role.ADMIN)), count: usersCounter(Role.ADMIN) },
  ]
  return (
    <Filters buttons={actions}/>
  )
}