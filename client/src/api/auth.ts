import client from "./axiosClient";

export const signup = async (payload: { name: string; email: string; password: string }) => {
    const res = await client.post("/auth/register", payload);
    return res.data;
};

export const login = async (payload: { email: string; password: string }) => {
    const res = await client.post("/auth/login", payload);
    return res.data;
};

export const getProfile = async () => {
    const res = await client.get("/users/me");
    return res.data;
};
