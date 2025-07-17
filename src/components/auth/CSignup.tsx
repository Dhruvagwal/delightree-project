// src/components/CSignup.tsx
import React from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStorage } from '../../hooks/useUserStorage';
import { useNavigation } from '@react-navigation/native';
import { form_styles } from './styles';

// Zod validation schema
const SignupSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  type: z.enum(['Admin', 'Auditor', 'Viewer']),
});

type SignupFormData = z.infer<typeof SignupSchema>;

const CSignup = () => {
  const navigation = useNavigation();
  const { saveUser } = useUserStorage();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: '',
      password: '',
      type: 'Viewer',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    await saveUser(data);
    Alert.alert('Success', 'User registered successfully');
    navigation.navigate('Login' as never);
  };

  return (
    <View>
      <Text style={form_styles.title}>Signup</Text>

      <Controller
        control={control}
        name="username"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Username"
            value={value}
            style={form_styles.input}
            onChangeText={onChange}
          />
        )}
      />
      {errors.username && <Text>{errors.username.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={value}
            style={form_styles.input}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <Text>User Type:</Text>
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <Picker
            style={form_styles.input}
            selectedValue={value}
            onValueChange={onChange}
          >
            <Picker.Item label="Admin" value="Admin" />
            <Picker.Item label="Auditor" value="Auditor" />
            <Picker.Item label="Viewer" value="Viewer" />
          </Picker>
        )}
      />
      {errors.type && (
        <Text style={form_styles.error}>{errors.type.message}</Text>
      )}

      <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default CSignup;
