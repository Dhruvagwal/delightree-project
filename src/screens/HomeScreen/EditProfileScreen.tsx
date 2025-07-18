import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '../../context/AuthContext';
import { useUserStorage } from '../../hooks/useUserStorage';
import {
  INPUT_COLOR,
  PRIMARY_COLOR,
  SCREEN_PADDING,
  TEXT_COLOR,
} from '../../styles/global';
import { form_styles } from '../../components/auth/styles';
import { useNavigation } from '@react-navigation/native';

const EditProfileSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  type: z.enum(['Admin', 'Auditor', 'Viewer']),
});

type EditProfileFormData = z.infer<typeof EditProfileSchema>;

const EditProfileScreen = () => {
  const { user, login } = useAuth();
  const { updateUser } = useUserStorage();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
      password: user?.password || '',
      type: user?.type || 'Viewer',
    },
  });

  const onSubmit = async (data: EditProfileFormData) => {
    const updatedUser = {
      ...user,
      ...data,
      name: user?.name ?? '',
    };

    await updateUser(updatedUser);
    await login(updatedUser);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.label}>Username</Text>
      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter username"
            placeholderTextColor="#888"
            style={form_styles.input}
          />
        )}
      />
      {errors.username && (
        <Text style={form_styles.error}>{errors.username.message}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter email"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            style={form_styles.input}
          />
        )}
      />
      {errors.email && (
        <Text style={form_styles.error}>{errors.email.message}</Text>
      )}

      <Text style={styles.label}>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder="Enter password"
            placeholderTextColor="#888"
            secureTextEntry
            style={form_styles.input}
          />
        )}
      />
      {errors.password && (
        <Text style={form_styles.error}>{errors.password.message}</Text>
      )}

      <Text style={styles.label}>Account Type</Text>
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={value}
              onValueChange={onChange}
              dropdownIconColor={TEXT_COLOR}
            >
              <Picker.Item label="Admin" value="Admin" />
              <Picker.Item label="Auditor" value="Auditor" />
              <Picker.Item label="Viewer" value="Viewer" />
            </Picker>
          </View>
        )}
      />
      {errors.type && (
        <Text style={form_styles.error}>{errors.type.message}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: SCREEN_PADDING,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: TEXT_COLOR,
    marginBottom: 24,
  },
  label: {
    color: TEXT_COLOR,
    marginBottom: 6,
    marginTop: 14,
    fontSize: 14,
    fontWeight: '500',
  },
  pickerWrapper: {
    backgroundColor: INPUT_COLOR,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 4,
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default EditProfileScreen;
