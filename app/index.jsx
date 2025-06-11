import { useRouter, useNavigationContainerRef } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Index() {
  const router = useRouter();
  const navigationContainerRef = useNavigationContainerRef();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sub = navigationContainerRef.addListener("state", () => {
      setIsReady(true);
    });
    return () => {
      if (sub) sub();
    };
  }, [navigationContainerRef]);

  useEffect(() => {
    if (isReady) {
      router.replace('./(auth)');
    }
  }, [isReady, router]);

  return null;
}
