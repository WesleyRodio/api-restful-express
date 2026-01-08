import { fileURLToPath } from "node:url";

import {
  CreateBucketCommand,
  GetObjectCommand,
  HeadBucketCommand,
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

import { envValidate } from "./env.js";

const env = envValidate();

export async function s3Client() {
  console.log("");
  console.log("🪣  AWS S3 - Starting");

  const s3Client = new S3Client({
    region: env.AWS_REGION,
    credentials: {
      accountId: env.AWS_ACCOUNT_ID,
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_ACCESS_KEY_ID_SECRET,
    },
  });

  const bucketName = env.AWS_BUCKET_NAME;

  console.log("");
  console.log("🪣  Loading bucket:");

  const { Buckets } = await s3Client.send(new ListBucketsCommand({}));
  const bucketExists = Buckets.some(bucket => bucket.Name === bucketName);
  if (!bucketExists) {
    console.log(`🪣  Creating bucket "${bucketName}"...`);
    await s3Client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      }),
    );
  } else {
    console.log(`🪣  Bucket ${bucketName} already exists`);
  }

  console.log("");
  console.log("🗂️  Loading folders:");

  const objects = ["Books/", "Users/", "Authors/"];
  for (const key of objects) {
    const existingKey = await getBucketObject(s3Client, bucketName, key);

    if (!existingKey) {
      try {
        console.log(`📂  Creating path: ${key}...`);

        await s3Client.send(
          new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
            Body: Buffer.from(""),
          }),
        );
      } catch (err) {
        console.log(err);
      }
    }
    console.log(`📂  Folder ${key} already exists`);
  }

  console.log("");
  console.log("☁️  AWS S3 Is already to use!");

  // await s3Client.send(
  //   new PutObjectCommand({
  //     Bucket: bucketName,
  //     Key: "my-first-object.txt",
  //     Body: "Hello, World!",
  //   }),
  // );

  // const { Body } = await s3Client.send(
  //   new GetObjectCommand({
  //     Bucket: bucketName,
  //     Key: "my-first-object.txt",
  //   }),
  // );

  // console.log(await Body.transformToString());

  // const prompt = createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });

  // const result = await prompt.question("Empty and delete bucket? (y/n) ");
  // prompt.close();

  // if (result.toLocaleLowerCase() === "y") {
  //   const paginator = paginateListObjectsV2(
  //     { client: s3Client },
  //     { Bucket: bucketName },
  //   );

  //   for await (const page of paginator) {
  //     const objects = page.Contents;

  //     if (objects) {
  //       for (const object of objects) {
  //         await s3Client.send(
  //           new DeleteObjectCommand({
  //             Bucket: bucketName,
  //             Key: object.Key,
  //           }),
  //         );
  //       }
  //     }
  //   }

  //   await s3Client.send(
  //     new DeleteBucketCommand({
  //       Bucket: bucketName,
  //     }),
  //   );
  // }
}

/**
 * @param {S3Client} s3Client
 * @param {string} bucketName
 */
async function getBucketRegion(s3Client, bucketName) {
  try {
    const { BucketRegion } = await s3Client.send(
      new HeadBucketCommand({ Bucket: bucketName }),
    );
    return BucketRegion;
  } catch (error) {
    return (
      error.region || error.$metadata?.httpHeaders?.["x-amz-bucket-region"]
    );
  }
}

/**
 * @param {S3Client} s3Client
 * @param {string} bucketName
 * @param {string} key
 * @returns
 */
async function getBucketObject(s3Client, bucketName, key) {
  try {
    const { Body } = await s3Client.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: key,
      }),
    );
    return Body;
  } catch {
    return null;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  s3Client();
}
