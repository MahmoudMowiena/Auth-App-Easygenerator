import axios from "axios";
import axiosInstance from "../api/axiosInstance";
import { LoginPayload, AuthResponse, SignUpPayload } from "../types/auth";

const API_URL = `${process.env.REACT_APP_API_URL}/auth`;

export const login = async (
  credentials: LoginPayload
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/login`,
    credentials
  );
  return response.data;
};

export const signup = async (data: SignUpPayload) => {
  return axiosInstance.post("/auth/signup", data);
};

export const logout = () => {
  localStorage.removeItem("token");
};
