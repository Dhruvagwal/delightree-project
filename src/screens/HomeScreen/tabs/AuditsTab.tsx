import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuditStorage, Audit } from '../../../hooks/useAuditStorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../interfaces/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../../context/AuthContext';

const AuditsTab = () => {
  const { getAudits } = useAuditStorage();
  const [audits, setAudits] = useState<Audit[]>([]);
  const { user } = useAuth();
  type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
  const navigation = useNavigation<NavigationProp>();

  const loadAudits = async () => {
    const data = await getAudits();
    const sorted = data.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    setAudits(sorted);
  };

  const handlePress = (audit: any) => {
    navigation.navigate('AuditDetail', { audit });
  };

  useFocusEffect(
    useCallback(() => {
      loadAudits();
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Audits</Text>
      {user?.type === 'Auditor' && (
        <Button
          title="Add New Audit"
          onPress={() => navigation.navigate('CreateAudit' as never)}
        />
      )}
      <FlatList
        data={audits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.auditItem}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>
              {new Date(item.createdAt).toLocaleString()}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No audits yet.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    borderColor: '#ccc',
  },
  auditItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  date: { fontSize: 12, color: 'gray' },
  empty: { textAlign: 'center', marginTop: 20, fontStyle: 'italic' },
});

export default AuditsTab;
