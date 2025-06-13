import { Platform } from 'react-native';

type UserSettings = {
  username: string;
  selectedMap: string;
};

let memoryStore: UserSettings | null = null;

export const saveSettings = async (settings: UserSettings): Promise<void> => {
  try {
    const json = JSON.stringify(settings);
    if (Platform.OS === 'web') {
      localStorage.setItem('user_settings', json);
    } else {
      memoryStore = settings; // 簡易的な代替手段
    }
  } catch (e) {
    console.error('設定の保存に失敗しました', e);
  }
};

export const loadSettings = async (): Promise<UserSettings | null> => {
  try {
    if (Platform.OS === 'web') {
      const json = localStorage.getItem('user_settings');
      return json ? JSON.parse(json) : null;
    } else {
      return memoryStore;
    }
  } catch (e) {
    console.error('設定の読み込みに失敗しました', e);
    return null;
  }
};
