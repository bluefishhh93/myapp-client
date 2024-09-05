// components/avatar-uploader.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { env } from "@/env";
import { Image, Upload } from "lucide-react";
interface ImageUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  return (
    <CldUploadWidget
      uploadPreset={env.NEXT_PUBLIC_UPLOAD_PRESET}
      signatureEndpoint={`${process.env.NEXTAUTH_URL}/api/sign-cloudinary-params`}
      onSuccess={async (result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          await onUploadSuccess(result.info.secure_url);          
        }
      }}
      options={{
        singleUploadAutoClose: true,
      }}
    >
      {({ open }) => (
        <button
          type="button"
          onClick={() => open()}
          className="flex items-center justify-center rounded-full"
        >
          <Image className="" />
          
        </button>
      )}
    </CldUploadWidget>
  );
}
