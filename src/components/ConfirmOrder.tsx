import React from 'react';
import { Modal, Table, Typography, Divider, Space, Tag } from 'antd';
import { products, promotions } from '../data/mockData';

const { Title, Text } = Typography;

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  promotionId?: string;
}

interface ConfirmOrderProps {
  order: {
    customerName: string;
    email: string;
    phone: string;
    cart: CartItem[];
    paymentMethod: 'CASH' | 'CARD';
    cashAmount?: number;
  };
  onClose?: () => void;
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ order, onClose }) => {
  const calculateItemTotal = (item: CartItem) => {
    let total = item.price * item.quantity;
    const promo = promotions.find(p => p.id === item.promotionId);
    if (promo) {
      total = promo.type === 'PERCENTAGE' ? total * (1 - promo.value / 100) : Math.max(0, total - promo.value);
    }
    return total;
  };

  const totalAmount = order.cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);

  // Tính tiền thừa trả khách
  const getChange = () => {
    if (order.paymentMethod === 'CASH' && order.cashAmount) {
      return Math.max(0, order.cashAmount - totalAmount);
    }
    return 0;
  };

  // Lấy tên sản phẩm từ ID
  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Sản phẩm không xác định';
  };

  // Lấy thông tin khuyến mãi từ ID
  const getPromotionInfo = (promotionId?: string) => {
    if (!promotionId) return null;
    const promo = promotions.find(p => p.id === promotionId);
    if (!promo) return null;

    return {
      code: promo.code,
      value: promo.type === 'PERCENTAGE' ? `${promo.value}%` : `${promo.value}đ`,
      type: promo.type
    };
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      key: 'product',
      render: (productId: string) => getProductName(productId)
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()}đ`
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Khuyến mãi',
      dataIndex: 'promotionId',
      key: 'promotion',
      render: (promotionId?: string) => {
        const promo = getPromotionInfo(promotionId);
        if (!promo) return 'Không có';
        return (
          <Tag color={promo.type === 'PERCENTAGE' ? 'blue' : 'green'}>
            {promo.code} ({promo.value})
          </Tag>
        );
      }
    },
    {
      title: 'Thành tiền',
      key: 'total',
      render: (_, record: CartItem) => `${calculateItemTotal(record).toLocaleString()}đ`
    }
  ];

  return (
    <Modal
      title={<Title level={3}>Xác nhận đơn hàng</Title>}
      open={true}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>
          <Title level={4}>Thông tin khách hàng</Title>
          <Text strong>Tên khách hàng:</Text> {order.customerName}<br />
          <Text strong>Email:</Text> {order.email}<br />
          <Text strong>Số điện thoại:</Text> {order.phone}
        </div>

        <Divider />

        <div>
          <Title level={4}>Thông tin giỏ hàng</Title>
          <Table
            dataSource={order.cart.map((item, index) => ({ ...item, key: index }))}
            columns={columns}
            pagination={false}
          />
        </div>

        <Divider />

        <div>
          <Title level={4}>Thông tin thanh toán</Title>
          <Text strong>Phương thức thanh toán:</Text> {order.paymentMethod === 'CASH' ? 'Tiền mặt' : 'Thẻ'}<br />

          {order.paymentMethod === 'CASH' && (
            <>
              <Text strong>Tiền khách đưa:</Text> {order.cashAmount?.toLocaleString()}đ<br />
              <Text strong>Tiền thừa trả khách:</Text> {getChange().toLocaleString()}đ<br />
            </>
          )}

          <Title level={4} style={{ marginTop: 16, color: '#1890ff' }}>
            Tổng tiền: {totalAmount.toLocaleString()}đ
          </Title>
        </div>
      </Space>
    </Modal>
  );
};

export { ConfirmOrder };