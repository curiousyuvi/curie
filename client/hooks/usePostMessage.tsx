import { useMutation } from "@tanstack/react-query";
import { postMessageAPI } from "../services/apiServices";

const usePostMessage = (onSuccess?: () => void) => {
  const mutation = useMutation({
    mutationFn: postMessageAPI,
    onSuccess,
  });
  return mutation;
};

export default usePostMessage;
