import React, { ReactNode, useState, useEffect } from "react";
import * as auth from "auth-provider";
// import { http } from "utils/http";
import { useMount } from "utils";
// import { useAsync } from "utils/use-async";
// import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { User } from "screens/project-list/search-panel";
import { http } from "utils/http";
// import { User } from "types/user";
// import { useQueryClient } from "react-query";

interface AuthForm {
  username: string;
  password: string;
}

//初始化user数据  否则刷新后user就会丢失  页面又会回到登录前状态
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  // const {
  //   data: user,
  //   error,
  //   isLoading,
  //   isIdle,
  //   isError,
  //   run,
  //   setData: setUser,
  // } = useAsync<User | null>();
  // const queryClient = useQueryClient();

  // point free
  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      // queryClient.clear();
    });

  //页面加载的时候调用
  useMount(() => {
    bootstrapUser().then(setUser);
  });

  // useEffect(() => {
  //   bootstrapUser().then(setUser)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useMount(() => {
  //   run(bootstrapUser());
  // });

  // if (isIdle || isLoading) {
  //   return <FullPageLoading />;
  // }

  // if (isError) {
  //   return <FullPageErrorFallback error={error} />;
  // }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
