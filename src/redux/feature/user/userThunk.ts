import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000"; // change as per backend

export const loginUser = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Try again."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (
    {
      name,
      email,
      password,
      dob,
      bio,
    }: {
      name: string;
      email: string;
      password: string;
      dob: string;
      bio?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        dob,
        bio,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }
  }
);
