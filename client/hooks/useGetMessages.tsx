import { useQuery } from "@tanstack/react-query";
import { getMessagesAPI } from "../services/apiServices";

const useGetMessages = (rid: string | string[] | undefined, after?: number) => {
  const query = useQuery({
    queryKey: ["getMessages", rid, after],
    queryFn: () => getMessagesAPI(rid, after),
  });
  return query;
};

export default useGetMessages;
