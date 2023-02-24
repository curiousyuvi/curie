import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getRoomAPI } from "../services/apiServices";

const useGetRoom = (rid: string | string[] | undefined) => {
  const query = useQuery({
    queryKey: ["getRoom", rid],
    queryFn: () => getRoomAPI(rid),
  });
  return query;
};

export default useGetRoom;
