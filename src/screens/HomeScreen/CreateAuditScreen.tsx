import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuditStorage, Audit } from '../../hooks/useAuditStorage';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'src/interfaces/types';

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

const CreateAuditScreen = () => {
  type Navigation = StackNavigationProp<RootStackParamList, 'CreateAudit'>;
  const navigation = useNavigation<Navigation>();

  const { saveAudit } = useAuditStorage();

  const [step, setStep] = useState(1);

  // Step 1
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  // Step 2
  const [rating, setRating] = useState(0);

  // Step 3
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleAuditType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type],
    );
  };

  const handleNext = () => {
    if (step === 1 && !title.trim()) {
      Alert.alert('Validation', 'Title is required');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    const newAudit: Audit = {
      title: title.trim(),
      createdAt: new Date().toISOString(),
      comment,
      rating,
      types: selectedTypes,
    } as any;

    await saveAudit(newAudit);
    navigation.replace('AuditDetail', { audit: newAudit });
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
        <Text style={rating > i ? styles.starFilled : styles.starEmpty}>★</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Audit (Step {step}/3)</Text>

      {step === 1 && (
        <>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Enter audit title"
          />

          <Text style={styles.label}>Comment</Text>
          <TextInput
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            placeholder="Enter comment"
            multiline
          />
        </>
      )}

      {step === 2 && (
        <>
          <Text style={styles.label}>Security Rating</Text>
          <View style={styles.starsRow}>{renderStars()}</View>
        </>
      )}

      {step === 3 && (
        <>
          <Text style={styles.label}>Audit Types</Text>
          {auditTypesList.map(type => (
            <TouchableOpacity
              key={type}
              onPress={() => toggleAuditType(type)}
              style={[
                styles.checkboxItem,
                selectedTypes.includes(type) && styles.checkedItem,
              ]}
            >
              <Text
                style={{
                  color: selectedTypes.includes(type) ? '#fff' : '#000',
                }}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </>
      )}

      <View style={styles.buttonRow}>
        {step > 1 && <Button title="Back" onPress={handleBack} />}
        {step < 3 ? (
          <Button title="Next" onPress={handleNext} />
        ) : (
          <Button title="Submit Audit" onPress={handleSubmit} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: { fontSize: 16, marginVertical: 8 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  starsRow: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  starFilled: {
    fontSize: 30,
    color: '#FFD700',
    marginHorizontal: 5,
  },
  starEmpty: {
    fontSize: 30,
    color: '#ccc',
    marginHorizontal: 5,
  },
  checkboxItem: {
    padding: 10,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 5,
  },
  checkedItem: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
  },
});

export default CreateAuditScreen;
