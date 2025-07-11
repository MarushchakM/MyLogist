import { Search } from "@/components/Search";
import { setSearchTerm } from "@/lib/features/users/usersSlice";
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";

export const UserSearch = () => {
  const searchTerm = useSelector((state: RootState) => state.users.searchTerm);
  const dispatch = useDispatch();

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchTerm(event.target.value));
  };
  
  return (
    <Search placeholder="Пошук працівника..." value={searchTerm} onChange={handleSearchChange} />
  ) 
}