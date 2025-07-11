'use client'

import { Container } from "@/components/Container";
import { UserFilter } from "@/features/users/components/UserFiltrer";
import { UserSearch } from "@/features/users/components/UserSearch";
import { UserTable } from "@/features/users/components/UserTable";
import { homePath } from "@/paths";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UsersPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

 
  if (user?.role !== "ADMIN") {
    return router.push(homePath());
  }
  
  return (
    <Container title='Працівники'>
      <UserSearch />
      <UserFilter />
      <UserTable/>
    </Container>
  )
}

export default UsersPage;