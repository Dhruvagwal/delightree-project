import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../context/AuthContext';
import { useUserStorage } from '../../hooks/useUserStorage';

const EditProfileScreen = () => {
  const { user, login } = useAuth();
  const { updateUser } = useUserStorage();

  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState(user?.password || '');
  const [type, setType] = useState(user?.type || 'Viewer');

  const handleSave = async () => {
    const updatedUser = {
      ...user,
      username: username.trim(),
      password: password.trim(),
      type,
    };
    await updateUser(updatedUser);
    await login(updatedUser);
    Alert.alert('Success', 'Profile updated');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
        style={styles.input}
      />

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Account Type</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={type}
          onValueChange={(itemValue) =>
            setType(itemValue as 'Admin' | 'Auditor' | 'Viewer')
          }>
          <Picker.Item label="Admin" value="Admin" />
          <Picker.Item label="Auditor" value="Auditor" />
          <Picker.Item label="Viewer" value="Viewer" />
        </Picker>
      </View>

      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '600', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  label: { marginBottom: 8, fontWeight: '500' },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
});

export default EditProfileScreen;
