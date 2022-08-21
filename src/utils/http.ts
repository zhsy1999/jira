import React from "react";
import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}
//{data, token, headers, ...customConfig}?: Config  此处前面有解构 后面不能用 ? 使其变可选  当一个参数有默认值当时候也会自动变为可选
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    //默认为get，如果customConfig传进来其他方法 写在后面会覆盖掉该method
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  // console.log(config, 'config')
  if (config.method.toUpperCase() === "GET") {
    endpoint += `${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
//用useHttp管理jwt和登录状态
export const useHttp = () => {
  const { user } = useAuth();
  // return ([endpoint, config]: [string, Config]) => http(endpoint, {...config, token: user?.token})
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
