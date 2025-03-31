import { apiClient } from "./apiClient";

export const signupUser = async (name, email, password) => {
  try {
    const response = await apiClient.post("/user/signup", {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const signin = async (email, password) => {
  try {
    const response = await apiClient.post("/user/signin", { email, password });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getuserApi = async () => {
  try {
    const response = await apiClient.get("/user/check");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const sendResumeApi = async (resumeData) => {
  try {
    const response = await apiClient.post("/user/resume", { resumeData });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getResumeApi = async () => {
  try {
    const response = await apiClient.get("/user/resume");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateResumeApi = async (id) => {
  try {
    const response = await apiClient.post("user/airesume", { id });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutApi = async () => {
  try {
    const response = await apiClient.post("/user/logout");
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const removeResumeApi=async(id)=>{
  try {
    const response=await apiClient.delete(`/user/resume/${id}`)
    return response.data
  } catch (error) {
    throw error
    
  }
}