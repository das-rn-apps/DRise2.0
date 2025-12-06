import type { IVerifyPaymentPayload } from "../utils/types";
import client from "./axiosClient";

export const initiatePayment = async (payload: IVerifyPaymentPayload) => {
    const res = await client.post("/payments/initiate", payload);
    return res.data;
};
