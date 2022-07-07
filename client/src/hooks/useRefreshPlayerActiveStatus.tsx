import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const refreshPlayerActiveStatus = async (
  setActive: (active: boolean) => void,
  deviceId: string,
  token: string,
  apiPrivateInstance: AxiosInstance
): Promise<void> => {
  try {
    const requestConfig: AxiosRequestConfig = {
      baseURL: "https://api.spotify.com/v1",
      url: "/me/player/devices",
      method: "get",
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios(requestConfig);
    if (response.status === 200) {
      const device = response.data.devices.find((device: any) => {
        return device.id.toString() === deviceId;
      });

      if (device) {
        if (device.is_active) setActive(true);
        else setActive(false);
      } else {
        setActive(false);
      }
    } else {
      console.error("Error in refreshing active status: ", response.data);
    }
  } catch (err: any) {
    console.error("Error in refreshing active status: ", err.response.data);
  }
};

const useRefreshPlayerActiveStatus = () => {
  return refreshPlayerActiveStatus;
};
export default useRefreshPlayerActiveStatus;
