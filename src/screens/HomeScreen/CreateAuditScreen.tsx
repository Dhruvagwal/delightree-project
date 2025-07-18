import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuditStorage } from '../../hooks/useAuditStorage';
import { RootStackParamList } from '../../interfaces/types';
import {
  INPUT_COLOR,
  PRIMARY_COLOR,
  SCREEN_PADDING,
  TEXT_COLOR,
} from '../../styles/global';
import MultiStepper from '../../components/global/MultiStepper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Audit } from '../../interfaces/audit';

const auditTypesList = [
  'Security',
  'Inventory',
  'Compliance',
  'Equipment',
  'Environment',
  'Software',
  'Licensing',
  'Other',
];

type Navigation = StackNavigationProp<RootStackParamList, 'CreateAudit'>;
type Route = RouteProp<RootStackParamList, 'CreateAudit'>;

const CreateAuditScreen = () => {
  const navigation = useNavigation<Navigation>();
  const route = useRoute<Route>();
  const { saveAudit, updateAudit } = useAuditStorage();

  const editingAudit: Audit | undefined = route.params?.audit;

  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    if (editingAudit) {
      setTitle(editingAudit.title || '');
      setComment(editingAudit.comment || '');
      setRating(editingAudit.rating || 0);
      setSelectedTypes(editingAudit.types || []);
    }
  }, [editingAudit]);

  const toggleAuditType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
        <Text style={rating > i ? styles.starFilled : styles.starEmpty}>★</Text>
      </TouchableOpacity>
    ));
  };

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Validation', 'Title is required');
      return;
    }

    const baseAudit: Audit = {
      ...(editingAudit || {}),
      id: editingAudit?.id ?? '', // Ensure id is always a string
      title: title.trim(),
      comment,
      rating,
      types: selectedTypes,
      createdAt: editingAudit?.createdAt || new Date().toISOString(),
    };

    if (editingAudit?.id) {
      await updateAudit(baseAudit);
    } else {
      await saveAudit(baseAudit);
    }

    navigation.replace('AuditDetail', { audit: baseAudit });
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: SCREEN_PADDING,
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={20} color={TEXT_COLOR} />
        </TouchableOpacity>
        <Text style={styles.header}>
          {editingAudit ? 'Edit Audit' : 'New Audit'}
        </Text>
      </View>

      <MultiStepper
        steps={['Details', 'Rating', 'Categories']}
        onStepNext={async step => {
          if (step === 0 && !title.trim()) {
            Alert.alert('Validation', 'Title is required');
            return false;
          }
          return true;
        }}
        onFinish={handleSubmit}
      >
        {/* Step 1 */}
        <>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="Enter audit title"
            placeholderTextColor="#aaa"
            style={styles.input}
          />

          <Text style={styles.label}>Comment</Text>
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Optional comment"
            placeholderTextColor="#aaa"
            multiline
            style={[styles.input, { height: 100 }]}
          />
        </>

        {/* Step 2 */}
        <>
          <Text style={styles.label}>Security Rating</Text>
          <View style={styles.starsRow}>{renderStars()}</View>
        </>

        {/* Step 3 */}
        <>
          <Text style={styles.label}>Select Audit Categories</Text>
          {auditTypesList.map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => toggleAuditType(type)}
              style={[
                styles.auditType,
                selectedTypes.includes(type) && styles.auditTypeSelected,
              ]}
            >
              <Text
                style={{
                  color: selectedTypes.includes(type) ? '#fff' : TEXT_COLOR,
                  textAlign: 'center',
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      </MultiStepper>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    padding: SCREEN_PADDING,
  },
  header: {
    fontSize: 24,
    color: TEXT_COLOR,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: TEXT_COLOR,
    marginBottom: 6,
    marginTop: 16,
  },
  input: {
    backgroundColor: INPUT_COLOR,
    padding: 12,
    borderRadius: 8,
    color: TEXT_COLOR,
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  starFilled: {
    fontSize: 32,
    color: '#FFD700',
    marginHorizontal: 5,
  },
  starEmpty: {
    fontSize: 32,
    color: '#555',
    marginHorizontal: 5,
  },
  auditType: {
    padding: 10,
    borderRadius: 6,
    backgroundColor: INPUT_COLOR,
    borderWidth: 1,
    borderColor: PRIMARY_COLOR,
    marginBottom: 10,
  },
  auditTypeSelected: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
});

export default CreateAuditScreen;
