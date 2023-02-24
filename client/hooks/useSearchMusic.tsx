import { useQuery } from "@tanstack/react-query";
import { searchMusicAPI } from "../services/apiServices";

const useSearchMusic = (query: string) => {
  const rquery = useQuery({
    queryKey: ["searchMusic", query],
    queryFn: () => searchMusicAPI(query),
  });
  return rquery;
};

export default useSearchMusic;
