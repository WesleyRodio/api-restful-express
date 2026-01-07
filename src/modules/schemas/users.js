import * as z from "zod";

import responses from "../../helpers/responses.js";

import handleErrorZod from "./index.js";

export const UserSchema = z.object({
  id: z.string({
    error: handleErrorZod,
  }),
  name: z.string({ error: iss => handleErrorZod(iss, "name", "string") }),
  password: z.string({
    error: iss => handleErrorZod(iss, "password", "string"),
  }),
  email: z.string({ error: iss => handleErrorZod(iss, "email", "string") }),
  role: z.enum(["READER", "LIBRARIAN", "ADMIN"], {
    error: iss => handleErrorZod(iss, "role", "READER | LIBRARIAN | ADMIN"),
  }),
  avatar: z.enum([z.string(), null], {
    error: iss => handleErrorZod(iss, "avatar", "string | null"),
  }),
});

export const UserUpdateSchema = UserSchema.partial().refine(
  data => {
    const providedFields = Object.values(data).filter(v => v !== undefined);
    return providedFields.length > 0;
  },
  {
    error: responses.invalidData(),
  },
);

export const UserLoginSchema = UserSchema.pick(
  {
    email: true,
    password: true,
  },
  {
    error: handleErrorZod,
  },
);

export const UserResponseSchema = UserSchema.omit({
  password: true,
}).partial();

export const UsersResponseSchema = UserSchema.omit({
  password: true,
})
  .partial()
  .array();
