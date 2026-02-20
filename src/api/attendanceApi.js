import axiosInstance from "./config";

export const checkInApi = async (formData) => {
  const response = await axiosInstance.post(
    "/attendance/checkin",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};


export const checkOutApi = async (formData) => {
  const response = await axiosInstance.post(
    "/attendance/checkout",
   formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
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
