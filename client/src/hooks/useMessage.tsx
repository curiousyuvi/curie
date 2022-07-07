import { AxiosRequestConfig } from "axios";
import { apiInstance } from "../api/axiosInstances";
import { Message } from "../interfaces/Message";

const sendMessage: (
  message: Message,
  rid: string
) => Promise<"success" | null> = async (message, rid) => {
  try {
    const requestConfig: AxiosRequestConfig = {
      url: `/room/send_message/${rid}`,
      method: "post",
      data: message,
      responseType: "json",
    };

    const response = await apiInstance(requestConfig);
    if (response.status === 200) {
      return "success";
    } else {
      console.error("Error in sending message: " + response.data.message);
      return null;
    }
  } catch (err) {
    console.error("Error in sending message: ", err);
    return null;
  }
};

const useMessage = () => {
  return { sendMessage };
};

export default useMessage;
