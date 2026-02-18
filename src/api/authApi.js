import axiosInstance from "./config";

export const employeeLogin = async (data) => {
  const response = await axiosInstance.post("/auth/login", data);

  if (response.data.success) {
    global.authToken = response.data.token;
    global.userRole = response.data.role;
  }

  return response.data;
};
