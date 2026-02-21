export const MOCK_PRODUCTS = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Chip A17 Pro mạnh mẽ, khung viền Titan siêu bền, hệ thống camera chuyên nghiệp.',
    price: 29990000,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000',
    images: [
      'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000',
      'https://images.unsplash.com/photo-1695048133142-13c8ed3ad44c?q=80&w=1000'
    ],
    isFeatured: true,
    category: 'Điện thoại',
    stock: 10,
    specs: "Màn hình 6.7 inch, Chip A17 Pro, RAM 8GB"
  },
  {
    id: 'p2',
    name: 'AirPods Pro Gen 2',
    description: 'Chống ồn chủ động vượt trội, âm thanh thích ứng và thời lượng pin ấn tượng.',
    price: 5990000,
    image: 'https://images.unsplash.com/photo-1588423770574-0107a6609a7d?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1588423770574-0107a6609a7d?q=80&w=1000'],
    isFeatured: false,
    category: 'Phụ kiện',
    stock: 50,
    specs: "Bluetooth 5.3, Chống nước IPX4, Pin 6h"
  },
  {
    id: 'p3',
    name: 'MacBook Air M2 13 inch',
    description: 'Thiết kế mỏng nhẹ sang trọng, hiệu năng cực đỉnh từ chip Apple M2.',
    price: 24990000,
    image: 'https://images.unsplash.com/photo-1661961110671-77b71b929d52?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1661961110671-77b71b929d52?q=80&w=1000'],
    isFeatured: true,
    category: 'Laptop',
    stock: 5,
    specs: "Chip M2, RAM 8GB, SSD 256GB"
  },
  {
    id: 'p4',
    name: 'iPad Pro M2 11 inch',
    description: 'Sức mạnh của máy tính trong thân hình máy tính bảng.',
    price: 21500000,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000',
    images: ['https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000'],
    isFeatured: true,
    category: 'Máy tính bảng',
    stock: 8,
    specs: "Màn hình Liquid Retina, Chip M2"
  }
];

export const MOCK_CATEGORIES = ['Tất cả', 'Điện thoại', 'Laptop', 'Máy tính bảng', 'Phụ kiện'];