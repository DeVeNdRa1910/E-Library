import { z } from "zod";

export const signInSchema = z.object({
  email: z.string({message: "User email should be a string"}),
  password: z.string({message: "Password should be a string"})
})
