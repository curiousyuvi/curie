import { useEffect } from "react";
import { apiInstance, privateApiInstance } from "../api/axiosInstances";
import useToken from "./useToken";

const useApiPrivate = () => {
  const { refreshToken } = useToken();

  useEffect(() => {
    const responseInterceptor = privateApiInstance.interceptors.response.use(
      (response) => response,
      (err) => {
        const prevRequest = err?.config;
        if (err?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          refreshToken().then((newToken) => {
            if (newToken) prevRequest.params["token"] = newToken;
            return apiInstance(prevRequest);
          });
        }
        return Promise.reject(err);
      }
    );

    return () => {
      apiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshToken]);

  return privateApiInstance;
};

export default useApiPrivate;
