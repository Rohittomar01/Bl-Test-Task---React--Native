import AsyncStorage from '@react-native-async-storage/async-storage';

/* ===== USERS LIST (Signup) ===== */
export const getUsers = async () => {
  const users = await AsyncStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUserToList = async (user: any) => {
  const users = await getUsers();
  users.push(user);
  await AsyncStorage.setItem('users', JSON.stringify(users));
};

/* ===== CURRENT LOGGED USER ===== */
export const saveCurrentUser = async (user: any) => {
  await AsyncStorage.setItem('currentUser', JSON.stringify(user));
};

export const getCurrentUser = async () => {
  const user = await AsyncStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const clearCurrentUser = async () => {
  await AsyncStorage.removeItem('currentUser');
};
