import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string({message: "User name should be a string"}),
  email: z.string({message: "User email should be a string"}),
  password: z.string({message: "Password should be a string"})
})