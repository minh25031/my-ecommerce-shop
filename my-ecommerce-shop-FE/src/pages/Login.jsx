import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Form, message, Card } from 'antd';
import { loginSchema } from '../utils/validationSchema';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/my-shop-logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = (data) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === data.email && u.password === data.password);

    if (user) {
      dispatch(login(user)); // Gửi thông tin user lên Redux
      message.success('Đăng nhập thành công!');
      navigate('/'); // Chuyển về trang chủ
    } else {
      message.error('Email hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm text-center px-4">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-28" />
        <Card title="Đăng Nhập" className="shadow-lg">
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller name="email" control={control} render={({ field }) => <Input {...field} />} />
          </Form.Item>

          <Form.Item label="Mật khẩu" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller name="password" control={control} render={({ field }) => <Input.Password {...field} />} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="h-10">Đăng Nhập</Button>
          <div className="text-center mt-4">
            Chưa có tài khoản? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/register')}>Đăng ký ngay</span>
          </div>
        </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
