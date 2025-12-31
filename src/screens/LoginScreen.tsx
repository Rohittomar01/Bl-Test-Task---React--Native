import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';

import { login } from '../redux/slices/authSlice';
import { getUsers, saveUserToList, saveCurrentUser } from '../utils/storage';
import styles from './LoginScreen.style';

/* ===== VALIDATION ===== */
const baseIdentifier = Yup.string()
  .required('Email or Mobile is required')
  .test('email-or-phone', 'Invalid email or mobile number', value => {
    if (!value) return false;
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /^[0-9]{10}$/.test(value)
    );
  });

const LoginSchema = Yup.object({
  identifier: baseIdentifier,
  password: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Password required'),
});

const SignupSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  identifier: baseIdentifier,
  password: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Password required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password required'),
});

/* ===== SCREEN ===== */
const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        <Text style={styles.title}>
          {isLogin ? 'Welcome Back 👋' : 'Create Account 🚀'}
        </Text>

        <Formik
          initialValues={{
            name: '',
            identifier: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={isLogin ? LoginSchema : SignupSchema}
          onSubmit={async (values, { setFieldError }) => {
            const users = await getUsers();

            if (isLogin) {
              // LOGIN
              const user = users.find(
                (u: any) =>
                  u.identifier === values.identifier &&
                  u.password === values.password,
              );

              if (!user) {
                Alert.alert('Error', 'Invalid credentials');
                return;
              }

              await saveCurrentUser(user);
              dispatch(login(user));
              navigation.replace('Products');
            } else {
              // SIGNUP
              const exists = users.some(
                (u: any) => u.identifier === values.identifier,
              );

              if (exists) {
                // Show error under identifier field
                setFieldError('identifier', 'User already exists');
                return;
              }

              await saveUserToList(values);
              await saveCurrentUser(values);
              dispatch(login(values));
              navigation.replace('Products');
            }
          }}
        >
          {({
            handleChange,
            handleSubmit,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <>
              {/* Name */}
              {!isLogin && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#999"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}
                </>
              )}

              {/* Identifier */}
              <TextInput
                style={styles.input}
                placeholder="Email or Mobile"
                placeholderTextColor="#999"
                value={values.identifier}
                onChangeText={handleChange('identifier')}
                onBlur={handleBlur('identifier')}
              />
              {touched.identifier && errors.identifier && (
                <Text style={styles.error}>{errors.identifier}</Text>
              )}

              {/* Password */}
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.error}>{errors.password}</Text>
              )}

              {/* Confirm Password (Signup only) */}
              {!isLogin && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm Password"
                    placeholderTextColor="#999"
                    secureTextEntry
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
                  )}
                </>
              )}

              {/* Submit */}
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSubmit as any}
              >
                <Text style={styles.primaryButtonText}>
                  {isLogin ? 'Login' : 'Signup'}
                </Text>
              </TouchableOpacity>

              {/* Toggle */}
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <Text style={styles.linkText}>
                  {isLogin ? 'No account? ' : 'Already registered? '}
                  <Text style={styles.link}>
                    {isLogin ? 'Signup' : 'Login'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
