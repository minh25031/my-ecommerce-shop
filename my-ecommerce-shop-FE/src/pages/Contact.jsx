import React from 'react';
import { Card, Form, Input, Button, message } from 'antd';

const Contact = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    contacts.push({ ...values, createdAt: Date.now() });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    message.success('Gửi liên hệ thành công. Cảm ơn bạn!');
    form.resetFields();
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Liên hệ</h1>

      <Card>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Email không hợp lệ' }]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Nội dung"
            rules={[{ required: true, message: 'Vui lòng nhập nội dung liên hệ' }]}
          >
            <Input.TextArea rows={6} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">Gửi liên hệ</Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Contact;
