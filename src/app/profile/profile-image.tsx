import { ConfigurationPanel } from "@/components/configuration-panel";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import { Suspense } from "react";
import { AvatarUploader } from "./profile-image-form";
import userService from "@/data-access/rest/users";
import { revalidatePath } from "next/cache";
import { getProfile } from "@/data-access/graphql/users";
export function getProfileImageFullUrl(image?: string) {
    return image ? image : "/default-avatar.png";
}


export async function ProfileImage() {
    return (
        <ConfigurationPanel title="Profile Image">
            <Suspense fallback={<Skeleton className="w-full h-[200px] rounded" />}>
                <ProfileImageContent />
            </Suspense>
        </ConfigurationPanel>
    )
}

async function saveAvatar(url: string) {
    "use server";
    const user = await getCurrentUser();

    if (!user) {
        console.error('No user found');
        return;
    }

    try {
        await userService.updateUser(user.accessToken, user.id, { image: url });
        revalidatePath("/profile");
    } catch (error) {
        console.error('Failed to update avatar:', error);
    }
}

async function ProfileImageContent() {
    const user = await getCurrentUser();

    if (!user) {
        return null;
    }

    const profile = await getProfile(user.accessToken);
    if (!profile) {
        return <p>User not found</p>;
    }

    return (
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-full max-w-[200px]">
            <Image
              src={getProfileImageFullUrl(profile.image)}
              width={200}
              height={200}
              className="w-full h-auto aspect-square object-cover rounded-full border-4 border-gray-200 shadow-lg dark:border-gray-800"
              alt="Profile image"
            />
            <span className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
              <AvatarUploader onUploadSuccess={saveAvatar} />
            </span>
          </div>
        </div>
      )
}