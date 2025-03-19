import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

const useTestimonialStore: any = create((set) => ({
  testmonials: [],
  isTestimonialsAreLoading: false,
  isCreatingTestimonial: false,

  getTestimonials: async () => {
    set({ isTestimonialAreLoading: true }); // Set loading to true
    try {
      const res = await axiosInstance.get('/testimonials/get');

      // Ensure you handle the case when the response has no data
      if (res.data && Array.isArray(res.data)) {
        set({ testimonials: res.data });
      } else {
        set({ testimonials: [] });
        console.log("No testimonials found.");
      }
    } catch (error: any) {
      console.log("Error fetching testimonials:", error);
      toast.error(error.response?.data?.message || 'An error occurred'); // Use a fallback message
    } finally {
      set({ isTestimonialAreLoading: false }); // Set loading to false
    }
  },
  
  createTestimonial: async (data: {L: string, M: string, N: string}) => {
    set({isCreatingTestimonial: true})
    try {
      await axiosInstance.post('/testimonials/create', data)
      toast.success('Testimonial Submitted Successfully')
    } catch (error: any) {
      console.log("error get testimonials",error);
      toast.error(error.response?.data?.message)
    } finally {
      set({isCreatingTestimonial: false})
    }
  },
}));


export default useTestimonialStore