import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Form, message, Card } from 'antd';
import { registerSchema } from '../utils/validationSchema';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo/my-shop-logo.png';

const Register = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = (data) => {
    // Giả lập lưu vào localStorage (Thay cho Backend)
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === data.email)) {
      return message.error('Email này đã được đăng ký!');
    }
    
    users.push({ email: data.email, password: data.password, fullName: data.fullName });
    localStorage.setItem('users', JSON.stringify(users));
    
    message.success('Đăng ký thành công!');
    navigate('/login');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md text-center px-4">
        <img src={logo} alt="Logo" className="mx-auto mb-4 w-32" />
        <Card title="Đăng Ký Tài Khoản" className="shadow-lg">
          <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Họ và tên" validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message}>
            <Controller name="fullName" control={control} render={({ field }) => <Input {...field} placeholder="Nguyễn Văn A" />} />
          </Form.Item>

          <Form.Item label="Email" validateStatus={errors.email ? 'error' : ''} help={errors.email?.message}>
            <Controller name="email" control={control} render={({ field }) => <Input {...field} placeholder="example@gmail.com" />} />
          </Form.Item>

          <Form.Item label="Mật khẩu" validateStatus={errors.password ? 'error' : ''} help={errors.password?.message}>
            <Controller name="password" control={control} render={({ field }) => <Input.Password {...field} />} />
          </Form.Item>

          <Form.Item label="Nhập lại mật khẩu" validateStatus={errors.confirmPassword ? 'error' : ''} help={errors.confirmPassword?.message}>
            <Controller name="confirmPassword" control={control} render={({ field }) => <Input.Password {...field} />} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="h-10 mt-2">Đăng Ký</Button>
        </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
