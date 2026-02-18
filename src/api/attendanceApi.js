import axiosInstance from "./config";

export const checkInApi = async (data) => {
  const response = await axiosInstance.post(
    "/attendance/checkin",
    data
  );
  return response.data;
};

export const checkOutApi = async (data) => {
  const response = await axiosInstance.post(
    "/attendance/checkout",
    data
  );
  return response.data;
};
export const getTodayAttendance = async () => {
  const response = await axiosInstance.get(
    "/attendance/today"
  );
  return response.data;
};
export const getProfile = async () => {
  const res = await axiosInstance.get("/user/profile");
  return res.data;
};
