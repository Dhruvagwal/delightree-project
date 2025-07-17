import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Audit } from '../../interfaces/audit';
import { useAuditStorage } from '../../hooks/useAuditStorage';
import { useAuth } from '../../context/AuthContext';
type AuditDetailRouteProp = RouteProp<
  { AuditDetail: { audit: Audit } },
  'AuditDetail'
>;

const AuditDetailScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const { deleteAudit } = useAuditStorage();
  const route = useRoute<AuditDetailRouteProp>();
  const { audit } = route.params;

  return (
    <View style={styles.container}>
      {user?.type === 'Admin' && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              'Confirm',
              'Are you sure you want to delete this audit?',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Delete',
                  style: 'destructive',
                  onPress: async () => {
                    await deleteAudit(audit.id);
                    navigation.goBack(); // or navigate to Audits list
                  },
                },
              ],
            );
          }}
        >
          <Text style={styles.deleteText}>Delete Audit</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.title}>{audit.title}</Text>

      <Text style={styles.label}>Created At</Text>
      <Text style={styles.text}>
        {new Date(audit.createdAt).toLocaleString()}
      </Text>

      {audit.comment ? (
        <>
          <Text style={styles.label}>Comment</Text>
          <Text style={styles.text}>{audit.comment}</Text>
        </>
      ) : null}

      {audit.rating !== undefined ? (
        <>
          <Text style={styles.label}>Security Rating</Text>
          <Text style={styles.stars}>
            {'★'.repeat(audit.rating)}
            {'☆'.repeat(5 - audit.rating)}
          </Text>
        </>
      ) : null}

      {audit.types?.length ? (
        <>
          <Text style={styles.label}>Audit Types</Text>
          <Text style={styles.text}>{audit.types.join(', ')}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', marginTop: 15 },
  text: { fontSize: 16, color: '#333', marginTop: 5 },
  stars: { fontSize: 24, color: '#FFD700', marginTop: 5 },
  deleteButton: {
    marginTop: 30,
    padding: 12,
    backgroundColor: '#ff4d4f',
    borderRadius: 6,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AuditDetailScreen;
