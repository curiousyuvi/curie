import { useEffect } from "react";
import { privateApiInstance } from "../api/axiosInstances";
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
            if (newToken) {
              const pathParts: string[] = prevRequest.url.split("/");
              pathParts[pathParts.length - 1] = newToken;
              prevRequest.url = pathParts.join("/");
            }
            return privateApiInstance(prevRequest);
          });
        }
        return Promise.reject(err);
      }
    );

    return () => {
      privateApiInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [refreshToken]);

  return privateApiInstance;
};

export default useApiPrivate;
