import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

// ✅ Define User Type
interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  profileImage: string;
  role: string;
  posts: any[];
  createdAt: Date;
  updatedAt: Date;
}

// ✅ Define State Type
interface AuthState {
  authUser: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpdatingProfile: boolean;
  isCheckingAuth: boolean;
  isCheckingForgot: boolean;
  forgotCode: number | null;
  forgotEmail: string;
  isVerifyingForgot: boolean;
  isResettingPassword: boolean;

  checkAuth: () => Promise<void>;
  signup: (data: { name: string; email: string; password: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  forgot: (data: { email: string }) => Promise<void>;
  verifyForgot: (code: number) => Promise<void>;
  reset: (data: { email: string; password: string; confirm: string }) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// ✅ Zustand Store with Types
export const useAuthStore = create<AuthState>((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isCheckingForgot: false,
  forgotCode: null,
  forgotEmail: '',
  isVerifyingForgot: false,
  isResettingPassword: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<{ user: User }>("/auth/check");
      set({ authUser: res.data.user });
    } catch (error: unknown) {
      console.error("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (obj) => {
    const data = {A: obj.name, B: obj.email, C: obj.password}
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post<{ user: User }>("/auth/signup", data);
      set({ authUser: res.data.user });
      toast.success("Account created successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (obj) => {
    const data = {D: obj.email, E: obj.password}
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post<{ user: User }>("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success("Logged in successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  },

  forgot: async (obj) => {
    const data = {I: obj.email}
    set({ isCheckingForgot: true });
    try {
      const res = await axiosInstance.post<{ code: number }>("/auth/forgot", data);
      set({ forgotCode: res.data.code, forgotEmail: obj.email });
      toast.success("Code sent to your email");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Forgot password request failed");
      console.error("Error in forgot:", error);
    } finally {
      set({ isCheckingForgot: false });
    }
  },

  verifyForgot: async (code) => {
    set({ isVerifyingForgot: true });
    try {
      const email = get().forgotEmail;
      if (Number(code) !== Number(get().forgotCode)) {
        toast.error("Enter correct code");
        set({ isVerifyingForgot: false });
        return;
      }
      const res = await axiosInstance.post<{ user: User }>("/auth/forgot/success", { J: email });
      set({ authUser: res.data.user });
      toast.success("Successfully logged in");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      set({ isVerifyingForgot: false });
    }
  },

  reset: async (obj) => {
    const data = {F: obj.email, G: obj.password, H: obj.confirm}
    set({ isResettingPassword: true });
    try {
      const res = await axiosInstance.post<{ user: User }>("/auth/reset", data);
      set({ authUser: res.data.user });
      toast.success("Password changed successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Reset password failed");
    } finally {
      set({ isResettingPassword: false });
    }
  },

  updateProfile: async (data: Partial<User>) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put<{ user: User }>("/auth/update-profile", {K: data.profileImage});
      set({ authUser: res.data.user });
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Profile update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
