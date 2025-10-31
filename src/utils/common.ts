import toast from "react-hot-toast";

export const notifyError = (message: string) => toast.error(message);

export const notifySuccess = (message: string) => toast.success(message);

export const ROOT_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const formatDate = (date?: Date) => {
  if (!date) return "recently";
  const d = new Date(date);
  return d.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
};
