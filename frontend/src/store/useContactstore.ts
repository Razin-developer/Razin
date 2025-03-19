import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useContactStore: any = create(() => ({
  
  createContact: async (data: {O: string, P: string, Q: string, R: string, S: string}) => {
    try {
      await axiosInstance.post('/contact/create', data)
      toast.success('Email Send Submitted Successfully')
    } catch (error: any) {
      console.log("error get testimonials",error);
      toast.error(error.response?.data?.message)
    }
  },
}));


export default useContactStore