import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'; // Chúng ta sẽ tạo file này ngay bên dưới
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import RequireAuth from './components/RequireAuth';
import MyAccount from './pages/MyAccount';
import Contact from './pages/Contact';

function App() {
  return (
    <Routes>
      {/* Nhóm 1: Các trang có Header & Footer */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="contact" element={<Contact />} />
        <Route path="my-account" element={<RequireAuth><MyAccount /></RequireAuth>} />
        {/* Sau này thêm các route con như: path="products", path="cart"... */}
      </Route>

      {/* Nhóm 2: Các trang không có Header/Footer */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;