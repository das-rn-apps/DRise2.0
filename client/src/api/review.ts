import client from "./axiosClient";

export const addReview = async (payload: { courseId: string; rating: number; comment?: string }) => {
    const res = await client.post("/reviews", payload);
    return res.data;
};

export const getReviews = async (courseId: string) => {
    const res = await client.get(`/reviews/course/${courseId}`);
    return res.data;
};
