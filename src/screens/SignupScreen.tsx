import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
});

export default function SignupScreen({ navigation }: any) {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={async values => {
        await AsyncStorage.setItem('user', JSON.stringify(values));
        navigation.replace('Login');
      }}
    >
      {({ handleChange, handleSubmit, errors }) => (
        <View>
          <TextInput placeholder="Email" onChangeText={handleChange('email')} />
          <Text>{errors.email}</Text>

          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={handleChange('password')}
          />
          <Text>{errors.password}</Text>

          <Button title="Signup" onPress={handleSubmit as any} />
        </View>
      )}
    </Formik>
  );
}
