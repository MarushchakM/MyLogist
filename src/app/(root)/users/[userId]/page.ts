// import { Button } from "@/components/Button";
// import { Container } from "@/components/Container";
// import { getTruck } from "@/features/trucks/queries/getTruck";
// import { trucksPath } from "@/paths";
// import styles from "./TruckPage.module.scss";
// import { LucideTrash } from "lucide-react";
// import { deleteTruck } from "@/features/trucks/actions/deleteTruck";
// import { notFound } from "next/navigation";
// import { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import { fetchUser, selectUserName } from "@/lib/features/user/userSlice";

// const UserPage = async ({
//   params,
// }: {
//   params: Promise<{ userId: string }>
//   }) => {
//   const dispatch = useAppDispatch();
//   const { firstName, lastName } = useAppSelector(selectUserName);
  
//   const { userId } = await params;
//   useEffect(() => {
//     dispatch(fetchUser(userId));
//   },[userId])

//   // if (!truck) {
//   //   notFound();
//   // }

//   return firstName;
// };

// export default UserPage;
