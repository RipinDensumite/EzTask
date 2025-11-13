import apiClient from "../client";
import type { AuthWithPasswordResponse } from "../types/Auth";
import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_API_URL);

const AuthRepository = {
  async login(email: string, password: string) {
    // const response = await apiClient.post(
    //   "/api/collections/users/auth-with-password",
    //   {
    //     email,
    //     password,
    //   },
    // );
    const response = await pb
      .collection("users")
      .authWithPassword(email, password);
    console.log("dapat result: ", response);
    return response;
  },
  async register(
    email: string,
    password: string,
  ): Promise<AuthWithPasswordResponse> {
    const response = await apiClient.post("/api/collections/users/records", {
      email,
      password,
    });
    return response.data;
  },
  async refreshToken(): Promise<AuthWithPasswordResponse> {
    const response = await apiClient.post(
      "/api/collections/users/auth-refresh",
      {},
    );
    return response.data;
  },
};

export default AuthRepository;
