import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function TermsOfService() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>利用規約</Text>

        <Text style={styles.sectionTitle}>第1条（適用）</Text>
        <Text style={styles.paragraph}>
          この利用規約（以下、「本規約」といいます。）は、ユーザーが本サービスを利用するにあたり適用されるものとします。
        </Text>

        <Text style={styles.sectionTitle}>第2条（禁止事項）</Text>
        <Text style={styles.paragraph}>
          ユーザーは、法令に違反する行為や公序良俗に反する行為を行ってはなりません。
        </Text>

        <Text style={styles.sectionTitle}>第3条（免責事項）</Text>
        <Text style={styles.paragraph}>
          本サービスの利用により生じた損害について、運営者は一切の責任を負いません。
        </Text>

        <Text style={styles.sectionTitle}>第4条（規約の変更）</Text>
        <Text style={styles.paragraph}>
          運営者は必要に応じて本規約を変更できるものとし、変更後の規約は本サービス上に掲載した時点で効力を生じます。
        </Text>

        <Text style={styles.footer}>2025年6月11日 制定</Text>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>戻る</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollView: { flex: 1 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 15, marginBottom: 8 },
  paragraph: { fontSize: 16, lineHeight: 24 },
  footer: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 40, marginBottom: 20 },
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 15,
    marginHorizontal: 40,
    marginBottom: 30,
    borderRadius: 20,
  },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
});