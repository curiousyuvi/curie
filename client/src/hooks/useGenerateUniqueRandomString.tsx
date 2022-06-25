const generateUniqueRandomString = () => {
  return crypto.randomUUID();
};

const useGenerateUniqueRandomString = () => generateUniqueRandomString;

export default useGenerateUniqueRandomString;
