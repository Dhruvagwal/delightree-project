import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  CommonActions,
} from '@react-navigation/native';
import { Audit } from '../../interfaces/audit';
import { useAuditStorage } from '../../hooks/useAuditStorage';
import { useAuth } from '../../context/AuthContext';
import { TEXT_COLOR, SCREEN_PADDING, INPUT_COLOR } from '../../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import { RootStackParamList } from '../../interfaces/types';
import { StackNavigationProp } from '@react-navigation/stack';

type AuditDetailRouteProp = RouteProp<
  { AuditDetail: { audit: Audit } },
  'AuditDetail'
>;

const AuditDetailScreen = () => {
  const { user } = useAuth();
  type NavigationProp = StackNavigationProp<RootStackParamList, 'AuditDetail'>;
  const navigation = useNavigation<NavigationProp>();

  const { deleteAudit } = useAuditStorage();
  const route = useRoute<AuditDetailRouteProp>();
  const { audit } = route.params;

  let date = moment(new Date(audit.createdAt)).format('MMM Do yyyy, h:mm A');

  const handleDelete = () => {
    Alert.alert('Confirm', 'Delete this audit?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteAudit(audit.id);
          handleGoBack();
        },
      },
    ]);
  };

  const handleEdit = () => {
    navigation.navigate('CreateAudit', { audit }); // pass existing audit data
  };

  const handleGoBack = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Home', // This should be your tab navigator screen
            state: {
              routes: [{ name: 'Audits' }], // This targets the Audits tab
            },
          },
        ],
      }),
    );
  };
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={20} color={TEXT_COLOR} />
        </TouchableOpacity>
        {/* Admin Actions */}
        {user?.type === 'Auditor' && (
          <View
            style={{
              flexDirection: 'row',
              gap: 5,
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
              <Ionicons name="create-outline" color={TEXT_COLOR} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDelete}
            >
              <Ionicons name="trash-outline" color={TEXT_COLOR} />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={{ marginTop: 30, gap: 20 }}>
        <View>
          <Text style={styles.text}>{date}</Text>
          <Text style={styles.title}>{audit.title}</Text>

          {audit.comment ? (
            <View
              style={{
                backgroundColor: INPUT_COLOR,
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Text style={styles.text}>{audit.comment}</Text>
            </View>
          ) : null}
        </View>

        {/* Rating */}
        {audit.rating !== undefined && (
          <View>
            <Text style={styles.label}>Security</Text>
            <Text style={styles.stars}>
              {'★'.repeat(audit.rating)}
              {'☆'.repeat(5 - audit.rating)}
            </Text>
          </View>
        )}

        {/* Types */}
        {audit.types?.length ? (
          <View>
            <Text style={styles.label}>Audit Types</Text>
            <Text style={styles.text}>{audit.types.join(', ')}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: SCREEN_PADDING,
  },
  title: {
    fontSize: 24,
    color: TEXT_COLOR,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: TEXT_COLOR,
    fontWeight: '600',
  },
  text: {
    color: '#aaa',
    marginVertical: 5,
  },
  stars: {
    fontSize: 24,
    color: '#FFD700',
  },
  deleteButton: {
    padding: 12,
    backgroundColor: '#ff4d4f',
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  },
  editButton: {
    padding: 12,
    backgroundColor: '#4096ff',
    borderRadius: 5,
    alignItems: 'center',
  },
  editText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AuditDetailScreen;
