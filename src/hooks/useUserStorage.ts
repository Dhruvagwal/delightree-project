import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  username: string;
  password: string;
  type: 'Admin' | 'Auditor' | 'Viewer';
}

const STORAGE_KEY = 'users';

export const useUserStorage = () => {
  const saveUser = async (user: User): Promise<void> => {
    const users = await getUsers();
    const updatedUsers = [...users, user];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const updateUser = async (updatedUser: User) => {
    const stored = await AsyncStorage.getItem('users');
    if (!stored) return;

    const users: User[] = JSON.parse(stored);
    const newUsers = users.map(u =>
      u.username === updatedUser.username ? updatedUser : u,
    );

    await AsyncStorage.setItem('users', JSON.stringify(newUsers));
  };

  const getUsers = async (): Promise<User[]> => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  };

  const validateUser = async (
    username: string,
    password: string,
  ): Promise<User | null> => {
    const users = await getUsers();
    return (
      users.find(u => u.username === username && u.password === password) ||
      null
    );
  };

  return {
    saveUser,
    getUsers,
    validateUser,
    updateUser,
  };
};
