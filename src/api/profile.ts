import client from "./client";

export const getMyProfile = () => client.get("/users/profile");
export const updateProfile = (data: any) => client.patch("/users/profile", data);