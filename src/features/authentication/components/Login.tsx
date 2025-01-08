import { useState, useEffect } from "react";
import { Button, Form, Input, Select, message } from "antd";
import {
  LockOutlined,
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../hooks/authStore";
import "../../../style/App.css";
import { Link, useNavigate } from "react-router-dom";
import { LoginValues } from "../dto/login.dto";
import { PagePath } from "../../../enums/page-path.enum";

const { Option } = Select;

const Login = () => {
  const [form] = Form.useForm();
  const [authenType, setAuthenType] = useState<string>("local");
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const mutation = useMutation<
    { success: boolean; message: string },
    unknown,
    LoginValues
  >({
    mutationFn: login,
    onSuccess: (response) => {
      if (response.success) {
        navigate(PagePath.HOME);
        message.success("Đăng nhập thành công");
      } else {
        message.error(response.message);
      }
    },
    onError: (error) => {
      message.error("Login failed: " + (error as Error).message);
    },
  });

  const onAuthenChange = (value: string) => {
    setAuthenType(value);
  };

  const onFinish = (values: LoginValues) => {
    mutation.mutate(values);
  };

  useEffect(() => {
    document.title = "Đăng nhập";
  }, []);

  return (
    <div>
      <img
        // src="https://dev.ddc.fis.vn/econstruction_web_client/assets/logo-ctc-horizontal-BCKyPDAh.png"
        src="https://cdn.fpt-is.com/vi/FPT-IS-set-logo-08-1715516291.svg"
        style={{ width: "200px" }}
      />
      <h2 style={{ fontWeight: 700, fontSize: "30px", margin: 0 }}>
        eConstruction
      </h2>
      <p style={{ marginTop: 0 }}>Đăng nhập để tiếp tục</p>
      <div className="form-container">
        <Form
          form={form}
          name="control-hooks"
          onFinish={onFinish}
          initialValues={{
            authen: "local",
            username: "ADMIN@GMAIL.COM",
            password: "admin",
          }}
        >
          <Form.Item
            name="authen"
            label="Phương thức xác thực"
            initialValue="local"
          >
            <Select defaultValue="local" onChange={onAuthenChange}>
              <Option value="local">Local</Option>
              <Option value="domain">Domain</Option>
            </Select>
          </Form.Item>

          {authenType === "local" && (
            <>
              <Form.Item
                name="username"
                label="Tài khoản"
                rules={[{ required: true, message: "Nhập tài khoản" }]}
              >
                <Input
                  allowClear
                  prefix={<UserOutlined />}
                  placeholder="Username"
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[{ required: true, message: "Nhập mật khẩu" }]}
              >
                <Input.Password
                  placeholder="input password"
                  prefix={<LockOutlined />}
                  allowClear
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Link to={PagePath.VERIFY_EMAIL}>Quên mật khẩu</Link>
              </Form.Item>
              <Form.Item>
                <Button className="login-btn" type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </>
          )}

          {authenType === "domain" && (
            <Form.Item>
              <Button className="login-btn" type="primary" htmlType="submit">
                Xác thực domain
              </Button>
            </Form.Item>
          )}
        </Form>
        <Button
          className="login-btn"
          type="primary"
          onClick={() => navigate(PagePath.REGISTER)}
        >
          Đăng ký
        </Button>
      </div>
    </div>
  );
};

export default Login;
