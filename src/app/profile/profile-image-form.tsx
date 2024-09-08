// components/avatar-uploader.tsx
"use client";

import { CldUploadWidget } from "next-cloudinary";
import { Upload } from "lucide-react";
import { useSession } from "next-auth/react";
interface AvatarUploaderProps {
  onUploadSuccess: (url: string) => Promise<void>;
}

export function AvatarUploader({ onUploadSuccess }: AvatarUploaderProps) {
  const { data: session, update } = useSession()
  return (
    <CldUploadWidget
      uploadPreset={process.env.NEXT_PUBLIC_UPLOAD_PRESET}
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={async (result) => {
        if (typeof result.info === "object" && "secure_url" in result.info) {
          await onUploadSuccess(result.info.secure_url);
          if (update) {
            await update({ image: result.info.secure_url });
          }
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
          className="flex items-center justify-center rounded-full bg-yellow-400 px-4 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 "
        >
          <Upload className="mr-2" />
          <span>Upload Avatar</span>
        </button>
      )}
    </CldUploadWidget>
  );
}
