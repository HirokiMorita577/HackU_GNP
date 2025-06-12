import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ChatList = () => {
    const [searchText, setSearchText] = useState('');
    const [chatList, setChatList] = useState([
  { id: '1', name: '田中太郎', message: 'こんにちは！', date: '2025-06-10 10:15', unreadCount: 2 },
  { id: '2', name: '佐藤花子', message: '今日の予定どうする？', date: '2025-06-09 09:00', unreadCount: 0 },
  { id: '3', name: '山田一郎', message: '了解しました！', date: '2025-06-08 18:30', unreadCount: 1 },
  // 他のデータも同様に
]);

    const [selectedTab, setSelectedTab] = useState('トーク');
    // 検索結果をフィルター
    const filteredList = chatList.filter((item) =>
        item.name.includes(searchText) || item.message.includes(searchText)
    );

    return (
        <View style={{ flex: 1 }}>
            
            <View style={styles.container}>
                <TextInput
                    placeholder="検索"
                    style={styles.searchInput}
                    value={searchText}
                    onChangeText={setSearchText}
                />

                <FlatList
                    data={filteredList}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.chatItem}>
                            <Text style={styles.chatName}>{item.name}</Text>
                            <Text style={styles.chatMessage}>{item.message}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        
            
            <View style={styles.buttonHome}>
                {['ホーム', 'トーク', '設定'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[
                            styles.buttonTalk,
                            selectedTab === tab && styles.navButtonActive,
                        ]}
                        onPress={() => setSelectedTab(tab)}
                    >
                        <Text
                            style={[
                                styles.buttonSet,
                                selectedTab === tab && styles.navButtonTextActive,
                            ]}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: '#fff',
    },
    searchInput: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
    },
    chatItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    chatName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    chatMessage: {
        fontSize: 14,
        color: '#666',
    },

    buttonHome: {
    flexDirection: 'row', // ← 横並びにする！
    justifyContent: 'space-around', // ← 間を均等にする
    padding: 10,
    backgroundColor: '#f0f0f0',
    },
    buttonTalk: {
    padding: 10,
    backgroundColor: "rgb(174, 184, 214)",
    borderRadius: 8,
    },
    buttonSet: {
        color: '#fff',
        fontWeight: 'bold',
    },
});



export default ChatList;
