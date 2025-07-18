import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUserStorage } from '../../hooks/useUserStorage';
import { useNavigation } from '@react-navigation/native';
import { form_styles } from './styles';
import MultiStepper from '../global/MultiStepper';
import { INPUT_COLOR, SCREEN_PADDING, TEXT_COLOR } from '../../styles/global';

const SignupSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email'),
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirm_password: z.string().min(1, 'Confirm your password'),
    type: z.enum(['Admin', 'Auditor', 'Viewer']),
  })
  .refine(data => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password'],
  });

type SignupFormData = z.infer<typeof SignupSchema>;

const CSignup = () => {
  const navigation = useNavigation();
  const { saveUser, getUsers } = useUserStorage();

  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(
    null,
  );
  const [checkingUsername, setCheckingUsername] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: '',
      email: '',
      username: '',
      password: '',
      confirm_password: '',
      type: 'Viewer',
    },
  });

  const watchedUsername = useWatch({ control, name: 'username' });

  // Realtime username availability check
  useEffect(() => {
    const checkUsername = async () => {
      if (!watchedUsername.trim()) {
        setUsernameAvailable(null);
        return;
      }

      setCheckingUsername(true);
      const users = await getUsers();
      const exists = users.some(u => u.username === watchedUsername);
      setUsernameAvailable(!exists);
      setCheckingUsername(false);
    };

    const timeout = setTimeout(checkUsername, 500); // debounce
    return () => clearTimeout(timeout);
  }, [watchedUsername]);

  const onSubmit = async (data: SignupFormData) => {
    if (!usernameAvailable) {
      Alert.alert('Error', 'Username is already taken');
      return;
    }

    await saveUser({
      username: data.username,
      password: data.password,
      type: data.type,
      name: data.name,
      email: data.email,
    });

    Alert.alert('Success', 'User registered successfully');
    navigation.navigate('Login' as never);
  };

  return (
    <ScrollView>
      <Text style={form_styles.title}>Signup</Text>
      <Text style={form_styles.subTitle}>Enter your details below</Text>
      <MultiStepper
        steps={['Personal Info', 'Account Info', 'Select Role']}
        onStepNext={async (stepIndex: number) => {
          const validFields: Array<Array<keyof SignupFormData>> = [
            ['name', 'email'],
            ['username', 'password', 'confirm_password'],
            ['type'],
          ];
          return await trigger(validFields[stepIndex]);
        }}
        onFinish={handleSubmit(onSubmit)}
      >
        {/* Step 1: Personal Info */}
        <View key="step-1">
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Full Name"
                value={value}
                style={form_styles.input}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name && (
            <Text style={form_styles.error}>{errors.name.message}</Text>
          )}

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={value}
                style={form_styles.input}
                onChangeText={onChange}
              />
            )}
          />
          {errors.email && (
            <Text style={form_styles.error}>{errors.email.message}</Text>
          )}
        </View>

        {/* Step 2: Account Info */}
        <View key="step-2">
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Username"
                  autoCapitalize="none"
                  value={value}
                  style={form_styles.input}
                  onChangeText={onChange}
                />
                {checkingUsername && <ActivityIndicator size="small" />}
                {usernameAvailable === false && (
                  <Text style={form_styles.error}>Username is taken</Text>
                )}
                {usernameAvailable && value.trim() !== '' && (
                  <Text style={form_styles.success}>Username is available</Text>
                )}
              </>
            )}
          />
          {errors.username && (
            <Text style={form_styles.error}>{errors.username.message}</Text>
          )}

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
          {errors.password && (
            <Text style={form_styles.error}>{errors.password.message}</Text>
          )}

          <Controller
            control={control}
            name="confirm_password"
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Confirm Password"
                secureTextEntry
                value={value}
                style={form_styles.input}
                onChangeText={onChange}
              />
            )}
          />
          {errors.confirm_password && (
            <Text style={form_styles.error}>
              {errors.confirm_password.message}
            </Text>
          )}
        </View>

        {/* Step 3: Select Role */}
        <View key="step-3">
          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: INPUT_COLOR,
                  marginBottom: SCREEN_PADDING * 0.5,
                }}
              >
                <Picker selectedValue={value} onValueChange={onChange}>
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
        </View>
      </MultiStepper>
    </ScrollView>
  );
};

export default CSignup;
