import { Stack } from 'expo-router';
import { View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
const Layout: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(page)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </SafeAreaView>
  );
};

export default Layout;
