import "dotenv/config";
import * as z from "zod";

const envSchema = z.object({
  APP_VERSION: z.string({ error: "APP_VERSION is required" }).default("1.0.0"),
  NODE_ENV: z
    .enum(["development", "production", "test"], {
      error: "NODE_ENV must be one of 'development', 'production', or 'test'",
    })
    .default("development"),
  PORT: z
    .string({ error: "PORT is required" })
    .transform(value => Number(value))
    .default("3000"),
  DATABASE_URL: z.string({ error: "DATABASE_URL is required" }),
  AWS_REGION: z
    .string({ error: "AWS_REGION is required" })
    .default("us-east-1"),
  AWS_ACCOUNT_ID: z.string({ error: "AWS_ACCOUNT_ID is required" }),
  AWS_ACCESS_KEY_ID: z.string({ error: "AWS_ACCESS_KEY_ID is required" }),
  AWS_ACCESS_KEY_ID_SECRET: z.string({
    error: "AWS_ACCESS_KEY_ID_SECRET is required",
  }),
  AWS_BUCKET_NAME: z.string({ error: "AWS_BUCKET_NAME is required" }),
  AWS_BUCKET_REGION: z
    .string({ error: "AWS_BUCKET_REGION is required" })
    .default("us-east-1"),
});

export const envValidate = () => {
  const parsedEnv = envSchema.safeParse(process.env);

  if (parsedEnv.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      z.treeifyError(parsedEnv.error),
    );
    process.exit(1);
  }

  return parsedEnv.data;
};
