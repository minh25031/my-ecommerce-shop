import React, { useMemo, useState } from 'react';
import { Row, Col, Select, Slider, Pagination, Typography } from 'antd';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../data/mockData';
import ProductCard from '../components/ProductCard';

const { Title } = Typography;
const { Option } = Select;

const Products = () => {
  const prices = MOCK_PRODUCTS.map(p => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [category, setCategory] = useState('Tất cả');
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [sort, setSort] = useState('default');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = useMemo(() => {
    let list = MOCK_PRODUCTS.slice();
    if (category && category !== 'Tất cả') {
      list = list.filter(p => p.category === category);
    }
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') list.sort((a, b) => b.price - a.price);
    if (sort === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [category, priceRange, sort]);

  const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div>
      <Title level={2} className="mb-6">Tất cả sản phẩm</Title>

      <div className="mb-6 flex flex-col md:flex-row md:items-center md:gap-6">
        <div className="mb-3 md:mb-0">
          <Select value={category} onChange={(v) => { setCategory(v); setPage(1); }} style={{ width: 200 }}>
            {MOCK_CATEGORIES.map((c) => (
              <Option key={c} value={c}>{c}</Option>
            ))}
          </Select>
        </div>

        <div className="mb-3 md:mb-0 flex-1">
          <div className="text-sm mb-1">Khoảng giá</div>
          <Slider range min={minPrice} max={maxPrice} value={priceRange} onChange={(v) => { setPriceRange(v); setPage(1); }} />
        </div>

        <div>
          <Select value={sort} onChange={(v) => setSort(v)} style={{ width: 220 }}>
            <Option value="default">Mặc định</Option>
            <Option value="price_asc">Giá: Thấp → Cao</Option>
            <Option value="price_desc">Giá: Cao → Thấp</Option>
            <Option value="name_asc">Tên: A → Z</Option>
          </Select>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {paged.map((product) => (
          <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      <div className="mt-8 flex justify-center">
        <Pagination current={page} pageSize={pageSize} total={filtered.length} onChange={(p) => setPage(p)} />
      </div>
    </div>
  );
};

export default Products;
