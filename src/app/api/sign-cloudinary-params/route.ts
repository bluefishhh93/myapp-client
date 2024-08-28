import { v2 as cloudinary } from "cloudinary";
import { env } from "@/env";

// const CLOUDINARY_CLOUD_NAME = env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
// const CLOUDINARY_API_KEY = env.CLOUDINARY_API_KEY;
// const CLOUDINARY_API_SECRET = env.CLOUDINARY_API_SECRET;

cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    env.CLOUDINARY_API_SECRET
  );

  return Response.json({ signature });
}
