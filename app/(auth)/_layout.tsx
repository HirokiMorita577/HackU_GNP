import { Stack } from 'expo-router';
import { View } from 'react-native';

const Layout = () => {
  return (
    <View style={{ flex: 1 }}>
      {/* Stackでラップしているのでページ遷移はここから行います */}
      <Stack>
        {/* 他のページへのリンクが必要なら、Stack.Screenで定義できます */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="signUp" options={{ headerShown: false }} />
        <Stack.Screen name="TermsOfService" options={{ headerShown: false }} />
        <Stack.Screen name="MapScreen" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
};

export default Layout;
