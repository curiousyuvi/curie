import { v4 as uuidv4 } from "uuid";

const generateUniqueRandomString = () => {
  return uuidv4();
};

const useGenerateUniqueRandomString = () => generateUniqueRandomString;

export default useGenerateUniqueRandomString;
