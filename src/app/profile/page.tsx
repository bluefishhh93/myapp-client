import { getCurrentUser } from "@/lib/session";
import { ProfileName } from "./profile-name";
import { ProfileImage } from "./profile-image";
import { getProfile } from "@/data-access/graphql/users";

// 

const ProfilePage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return <p>You need to be signed in to view this page.</p>;
  }
  const profile = await getProfile(user.accessToken);
  if (!profile) {
    return <p>User not found</p>;
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <ProfileImage />
        <ProfileName firstname={profile.firstname!} lastname={profile.lastname!} />
      </div>
    </div>
  );
};

export default ProfilePage;
