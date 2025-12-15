import { z } from "zod";

export const loginBodySchema = z.object({
  body: z.object({
    username: z.string({
      required_error: "User name is required",
    }),
    password: z.string({
      required_error: "Password is required",
    }),
  }),
});
