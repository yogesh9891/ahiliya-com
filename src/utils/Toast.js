import { toast } from "react-toastify";

export const successToast = (message) => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    // toast.dark(message, { autoClose: 2000 });
}


export const errorToast = (err) => {
    if (err?.response?.data?.message) {
        toast.error(err?.response?.data?.message, { autoClose: 3000 });
    }
    else if (err?.message) {
        toast.error(err?.message, { autoClose: 3000 });
    }
    else {
        toast.error(err, { autoClose: 3000 });
    }
} 