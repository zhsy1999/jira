// import React from "react";
// import { useAuth } from "context/auth-context";
// import { Form, Input } from "antd";
// import { LongButton } from "unauthenticated-app/index";
// import { useAsync } from "utils/use-async";

// // interface Base {
// //   id: number
// // }
// //
// // interface Advance extends Base {
// //   name: string
// // }
// //
// // const test = (p: Base) => {
// // }
// //
// // // 鸭子类型(duck typing)：面向接口编程 而不是 面向对象编程
// // const a = {id: 1, name: 'jack'}
// // test(a)
// const apiUrl = process.env.REACT_APP_API_URL;

// export const LoginScreen = ({
//   onError,
// }: {
//   onError: (error: Error) => void;
// }) => {
//   const { login, user } = useAuth();
//   const { run, isLoading } = useAsync(undefined, { throwOnError: true });

//   // HTMLFormElement extends Element
//   const handleSubmit = async (values: {
//     username: string;
//     password: string;
//   }) => {
//     try {
//       await run(login(values));
//     } catch (e) {
//       onError(e);
//     }
//   };

//   return (
//     <Form onFinish={handleSubmit}>
//       <Form.Item
//         name={"username"}
//         rules={[{ required: true, message: "请输入用户名" }]}
//       >
//         <Input placeholder={"用户名"} type="text" id={"username"} />
//       </Form.Item>
//       <Form.Item
//         name={"password"}
//         rules={[{ required: true, message: "请输入密码" }]}
//       >
//         <Input placeholder={"密码"} type="password" id={"password"} />
//       </Form.Item>
//       <Form.Item>
//         <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
//           登录
//         </LongButton>
//       </Form.Item>
//     </Form>
//   );
// };

import React, { FormEvent, useState } from "react";
import { resolveProjectReferencePath } from "typescript";
import { useAuth } from "context/auth-context";
// const apiUrl = "http://localhost:3001";
const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreem = () => {
  const [list, setList] = useState([]);
  const { login, user } = useAuth();
  // const login = (param: { username: string; password: string }) => {
  //   fetch(`${apiUrl}/login`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(param),
  //   }).then(async (response: Response) => {
  //     if (response.ok) {
  //       setList(await response.json());
  //     }
  //   });
  // };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* 登录成功，用户名为{user?.name} */}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username"></input>
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password"></input>
      </div>
      <button type={"submit"}>登录</button>
    </form>
  );
};
