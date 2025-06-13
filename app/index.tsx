import { useNavigationContainerRef, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const router = useRouter();
  const navigationContainerRef = useNavigationContainerRef();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const sub = navigationContainerRef.addListener('state', () => {
      setIsReady(true);
    });
    return () => {
      if (sub) sub();
    };
  }, [navigationContainerRef]);

  useEffect(() => {
    if (isReady) {
      const timeout = setTimeout(() => {
        router.replace('./(auth)');
      }, 500); // 500ミリ秒 = 0.5秒

      return () => clearTimeout(timeout); // クリーンアップ
    }
  }, [isReady, router]);

  return null;
};

export default Index;
