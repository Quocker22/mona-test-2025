"use client"

import React, { useMemo } from 'react';
import { Modal, Table, Typography, Divider, Space, Tag } from 'antd';
import { products, promotions } from '../data/mockData';
import { formatNumber } from '@/utils/format';
import { CartItem, OrderForm } from '@/types';
const { Title, Text } = Typography;


interface ConfirmOrderProps {
  order: OrderForm
  onClose?: () => void;
}

const ConfirmOrder: React.FC<ConfirmOrderProps> = ({ order, onClose }) => {
  const calculateItemTotal = (item: CartItem) => {
    let total = (item?.price || 0) * item.quantity;
    const promo = promotions.find(p => p.id === item.promotionId);
    if (promo) {
      total = promo.type === 'PERCENTAGE' ? total * (1 - promo.value / 100) : Math.max(0, total - promo.value);
    }
    return total;
  };

  const totalAmount = useMemo(() => {
    return order.cart.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  }, [order.cart]);

  const getChange = () => {
    if (order.paymentMethod === 'CASH' && order.cashAmount) {
      return Math.max(0, order.cashAmount - totalAmount);
    }
    return 0;
  };

  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Sản phẩm không xác định';
  };


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
      render: (price: number) => <span className='font-bold'>{formatNumber(price)}</span>
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
      render: (_: unknown, record: CartItem) => `${formatNumber(calculateItemTotal(record))}`
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
          <Text strong>Tên khách hàng:</Text> {order.customer.name}<br />
          <Text strong>Email:</Text> {order.customer.email}<br />
          <Text strong>Số điện thoại:</Text> {order.customer.phone}
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