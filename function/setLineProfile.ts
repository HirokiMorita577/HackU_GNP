import liff from '@line/liff';
import { useAtom } from 'jotai';
import { userIdAtom, displayNameAtom } from '../atom/profileAtoms';
import { profilePictureUrlAtom } from '../atom/profileAtoms';


export function setLineProfile() {
  const [userId, setUserId] = useAtom(userIdAtom);
  const [displayName, setDisplayName] = useAtom(displayNameAtom);
  const [profilePictureUrl, setProfilePictureUrl] = useAtom(profilePictureUrlAtom);
  liff.init({ liffId: "2007570642-6BxVDbdl" })
    .then(async () => {
        if (!liff.isLoggedIn()) {
        liff.login();
        return;
        }
        const profile = await liff.getProfile();
        profile.pictureUrl
        setProfilePictureUrl(profile.pictureUrl ?? null);
        setUserId(profile.userId);
        setDisplayName(profile.displayName);
        // groupId取得例（LIFF v2.19.0以降）
        const context = liff.getContext();
        if (context && context.type === 'group') {
        }
    })
    .catch((err) => {
        console.error("LIFF initialization failed", err);
    });
  return { userId, displayName, profilePictureUrl };
}