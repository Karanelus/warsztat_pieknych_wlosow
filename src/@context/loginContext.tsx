/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Users } from "../@types/users.type";
import { logIn, logOut, tokenProve } from "../@api/admin.api";

type Props = {
  children: ReactNode;
};

const useLogin = () => {
  const [user, setUser] = useState<Users | null>(null);

  const { data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () => tokenProve(),
  });

  useEffect(() => {
    if (userData) {
      setUser({ user: userData.user.login, role: userData.user.role });
    }
  }, [userData]);

  const {
    mutate: loginFn,
    isPending: loginLoading,
    error: loginError,
  } = useMutation({
    mutationFn: ({ login, password }: { login: string; password: string }) =>
      logIn(login, password),
    onSuccess: (data) => {
      if (data) {
        setUser(data.user);
      } else {
        throw new Error("Invalid credentials");
      }
    },
    onError: () => {
      setUser(null);
    },
  });

  const { mutate: logoutFn } = useMutation({
    mutationFn: () => logOut(),
    onSuccess: () => {
      setUser(null);
    },
    onError: () => {
      throw new Error("Wrong data");
    },
  });

  return {
    user,
    loginFn,
    logoutFn,
    loginLoading,
    loginError,
  };
};

type LoginContentProps = ReturnType<typeof useLogin>;

const LoginContext = createContext({} as LoginContentProps);

export const useLoginContext = () => {
  const context = useContext(LoginContext);

  if (!context) throw new Error("Context must be used within LoginContext");

  return context;
};

export const LoginContextContainer = ({ children }: Props) => {
  const value = useLogin();

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};
