import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useAuditStorage } from '../../../hooks/useAuditStorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../interfaces/types';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../../../context/AuthContext';
import LottieView from 'lottie-react-native';
import {
  TEXT_COLOR,
  INPUT_COLOR,
  SCREEN_PADDING,
  PRIMARY_COLOR,
  Logo,
} from '../../../styles/global';
import { Audit } from '../../../interfaces/audit';
import moment from 'moment';

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
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Logo />
          <Text style={styles.header}>Welcome {user?.name ?? 'User'}</Text>
        </View>
        {user?.type === 'Auditor' && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('CreateAudit' as never)}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        data={audits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.auditItem}
            onPress={() => handlePress(item)}
          >
            <Text style={styles.date}>
              {moment(new Date(item.createdAt)).format('MMM Do yyyy, h:mm A')}
            </Text>
            <Text style={styles.title}>{item.title}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View
            style={{
              alignItems: 'center',
              marginTop: 50,
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <LottieView
              style={{ width: 500, height: 200 }}
              source={require('../../../assets/ghost.json')}
              autoPlay
              loop
            />
            <Text style={styles.empty}>
              No audits found.{' '}
              {user?.type === 'Auditor'
                ? 'Create one!'
                : 'Please wait for an auditor to create an audit.'}
            </Text>
          </View>
        }
        contentContainerStyle={{ paddingTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SCREEN_PADDING,
    marginTop: 30,
  },
  header: {
    fontSize: 16,
    color: TEXT_COLOR,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: INPUT_COLOR,
    marginBottom: SCREEN_PADDING,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: TEXT_COLOR,
  },
  auditItem: {
    backgroundColor: INPUT_COLOR,
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  title: {
    color: TEXT_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  date: {
    color: '#aaa',
    fontSize: 12,
  },
  empty: {
    color: TEXT_COLOR,
    textAlign: 'center',
    marginTop: 30,
    fontStyle: 'italic',
    fontSize: 14,
  },
});

export default AuditsTab;
