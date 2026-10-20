import { z } from "zod";

export const quoteItemSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  material: z.string().min(1),
  size: z.string().min(1),
  qty: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  total: z.number().nonnegative(),
  artworkUrl: z.string().optional().default(""),
  notes: z.string().optional().default(""),
});

export const quoteSubmitSchema = z.object({
  name: z.string().min(2, "Please enter your full name."),
  company: z.string().optional().default(""),
  phone: z
    .string()
    .min(9, "Please enter a valid phone number.")
    .regex(/^[+0-9()\s-]+$/, "Please enter a valid phone number."),
  email: z.string().email("Please enter a valid email address."),
  deliveryAddress: z.string().min(5, "Please enter a delivery address in Nairobi."),
  turnaround: z.enum(["standard", "express", "bulk"]),
  items: z.array(quoteItemSchema).min(1, "Add at least one product to your quote."),
  recaptchaToken: z.string().optional().default(""),
  recaptchaV2Token: z.string().optional().default(""),
});

export type QuoteSubmitInput = z.infer<typeof quoteSubmitSchema>;
export type QuoteItemInput = z.infer<typeof quoteItemSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional().default(""),
  message: z.string().min(10, "Please write a message of at least 10 characters."),
  recaptchaToken: z.string().optional().default(""),
  recaptchaV2Token: z.string().optional().default(""),
});

export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  recaptchaToken: z.string().optional().default(""),
});

export const signUpSchema = z
  .object({
    name: z.string().min(2, "Please enter your full name."),
    email: z.string().email("Please enter a valid email address."),
    phone: z
      .string()
      .min(9, "Please enter a valid phone number.")
      .regex(/^[+0-9()\s-]+$/, "Please enter a valid phone number."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Please confirm your password."),
    recaptchaToken: z.string().optional().default(""),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ContactInput = z.infer<typeof contactSchema>;

export const TURNAROUND_LABELS: Record<string, string> = {
  standard: "Standard (2 to 3 days)",
  express: "Express (24 hours)",
  bulk: "Bulk (5 days)",
};
