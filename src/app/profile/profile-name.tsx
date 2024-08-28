import { ConfigurationPanel } from "@/components/configuration-panel";
import { ProfileNameForm } from "./profile-name-form";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { getCurrentUser } from "@/lib/session";
import userService from "@/data-access/rest/users";
import { revalidatePath } from "next/cache";

async function saveName(values: { firstname: string; lastname: string }) {
  "use server";
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("User not found");
  }

  try {
    await userService.updateUser(user.accessToken, user.id, values);
    revalidatePath("/profile");
  } catch (error) {
    console.error("Failed to update name:", error);
    throw new Error("Failed to update name");
  }
}

export async function ProfileName({ firstname, lastname }: { firstname: string; lastname: string }) {
  return (
    <ConfigurationPanel title="Display Name">
      <Suspense fallback={<Skeleton className="w-full h-[200px] rounded" />}>
        <ProfileNameForm firstname={firstname} lastname={lastname} handleSubmit={saveName} />
      </Suspense>
    </ConfigurationPanel>
  );
}
