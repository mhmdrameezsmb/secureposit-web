import { toast } from "react-toastify";

const ToastService = {
  success: async (message: any) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "#50C878", // Set the background color to red
        color: "white", // Set the text color to white or any contrasting color
      },
    });
  },

  error: async (message: any) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      style: {
        background: "0xffef5350", // Set the background color to red
        color: "white", // Set the text color to white or any contrasting color
      },
    });
  },
};

export default ToastService;
