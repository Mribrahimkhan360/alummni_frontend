import { toast } from "react-toastify";

const defaults = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  style: { fontSize: "12px" }, 
};

export const notifyMessage = (message) => {
  toast.success(message, defaults);
};

export const notifyError = (message) => {
  toast.error(message, defaults);
};

export const notifyWarning = (message) => {
  toast.warning(message, defaults);
};

export const notifyInfo = (message) => {
  toast.info(message, defaults);
};
