// src/services/stripe.service.ts
import Stripe from "stripe";

export const createStripeCheckout = async (
    lineItems: any[],
    successUrl: string,
    cancelUrl: string
) => {
    const stripeKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
        return { id: `fake_stripe_${Date.now()}` };
    }

    const stripe = new Stripe(stripeKey);

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
    });

    return session;
};
