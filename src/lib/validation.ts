import { z } from "zod";

// One source of truth for "what a valid contact submission looks like."
// The frontend form imports this to validate before sending.
// The Lambda re-validates the same shape server-side.
// Never trust the browser — the server check is the one that counts.
export const contactSchema = z.object({
  firstName: z.string().min(1, "Please enter your first name").max(100),
  lastName: z.string().min(1, "Please enter your last name").max(100),
  email: z.string().email("Please enter a valid email"),
  countryCode: z.string().min(1).max(10),
  phone: z.string().min(4, "Please enter a valid phone number").max(20),
  service: z.string().min(1, "Please select a service"),
  budget: z.string().max(100).optional().or(z.literal("")),
  projectDescription: z.string().min(1, "Please tell us about your project").max(2000),
  requestNDA: z.boolean().optional(),
  // Honeypot: a hidden field real users never fill. Bots do. If it has
  // anything in it, we reject the submission on the server.
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
