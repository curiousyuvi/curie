import { useQuery } from "@tanstack/react-query";
import { onlineUsersAPI } from "../services/apiServices";

const useGetOnlineUsers = (rid: string | string[] | undefined) => {
  const query = useQuery({
    queryKey: ["onlineUsers", rid],
    queryFn: () => onlineUsersAPI(rid),
  });
  return query;
};

export default useGetOnlineUsers;
