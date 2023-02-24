import { useMutation } from "@tanstack/react-query";
import { createRoomAPI } from "../services/apiServices";

const useCreateRoom = (onSuccess: () => void) => {
  const mutation = useMutation({
    mutationFn: createRoomAPI,
    onSuccess,
  });
  return mutation;
};

export default useCreateRoom;

// () => {
//       successToast("Room created successfully");
//       router.replace(`/${roomID}`);
//     }
