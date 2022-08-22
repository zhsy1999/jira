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

// export const RegisterScreen = ({
//   onError,
// }: {
//   onError: (error: Error) => void;
// }) => {
//   const { register, user } = useAuth();
//   const { run, isLoading } = useAsync(undefined, { throwOnError: true });

//   // HTMLFormElement extends Element
//   const handleSubmit = async ({
//     cpassword,
//     ...values
//   }: {
//     username: string;
//     password: string;
//     cpassword: string;
//   }) => {
//     if (cpassword !== values.password) {
//       onError(new Error("请确认两次输入的密码相同"));
//       return;
//     }
//     try {
//       await run(register(values));
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
//       <Form.Item
//         name={"cpassword"}
//         rules={[{ required: true, message: "请确认密码" }]}
//       >
//         <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
//       </Form.Item>
//       <Form.Item>
//         <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
//           注册
//         </LongButton>
//       </Form.Item>
//     </Form>
//   );
// };
import React, { FormEvent, useState } from "react";
import { resolveProjectReferencePath } from "typescript";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
// const apiUrl = "http://localhost:3001";
const apiUrl = process.env.REACT_APP_API_URL;

export const RegisterScreen = () => {
  const [list, setList] = useState([]);
  const { register, user } = useAuth();
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
    register({ username, password });
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"确认密码"} type="password" id={"cpassword"} />
      </Form.Item>
      <Form.Item>
        <Button htmlType={"submit"} type={"primary"}>
          注册
        </Button>
        {/* <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton> */}
      </Form.Item>
    </Form>
  );
};
