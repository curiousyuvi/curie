import toast from "react-hot-toast";

const successToast = (message: string) => {
  toast.success(message, {
    style: {
      borderRadius: "10px",
      background: "rgba(56, 56, 56,0.4)",
      color: "#fff",
      border: "1px solid rgba(165, 180, 252,0.2)",
    },
    iconTheme: {
      primary: "#4ade80",
      secondary: "#FFFAEE",
    },
  });
};

const errorToast = (message: string) => {
  toast.error(message, {
    style: {
      borderRadius: "10px",
      background: "rgba(56, 56, 56,0.4)",
      color: "#fff",
      border: "1px solid rgba(165, 180, 252,0.2)",
    },
    iconTheme: {
      primary: "#ef4444",
      secondary: "#FFFAEE",
    },
  });
};

const useToast = () => {
  return { successToast, errorToast };
};
export default useToast;
