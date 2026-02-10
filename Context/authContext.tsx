import { User } from "@/DATA/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import DATA from "../DATA/users.json";
type AuthContextType = {
  currentUser?: User;
  isAuthenticated: boolean;
  login: (
    userName: string,
    password: string,
  ) => Promise<null | (typeof DATA)[0]>;
  logout: () => Promise<void>;
};

export const authContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => null,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const STORAGE_KEY = "authUser";
  const [user, setUser] = useState<null | (typeof DATA)[0]>(null);
  const [currentUser, setCurrentUser] = useState<undefined | User>(undefined);

  useEffect(() => {
    const restore = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          setUser(JSON.parse(raw));
        }
      } catch (e) {
        // ignore restore errors for now
      }
    };
    restore();
  }, []);

  // Sync currentUser with user state
  const login = async (userName: string, password: string) => {
    const found = DATA.find(
      (u) => u.email === userName && u.password === password,
    );
    if (found) {
      setUser(found);
      setCurrentUser(found);
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      } catch (e) {
        // ignore storage errors for now
      }
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: `Welcome back, ${found.name}!`,
        topOffset: 30,
      });
      return found;
    }
    setUser(null);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    return null;
  };

  // Logout function to clear user state and AsyncStorage
  const logout = async () => {
    setUser(null);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  };

  const isAuthenticated = !!user;

  return (
    <authContext.Provider
      value={{ isAuthenticated, login, logout, currentUser }}
    >
      {children}
    </authContext.Provider>
  );
};
