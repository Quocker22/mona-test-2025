"use client"

import { useForm, Controller, useFieldArray, Resolver } from 'react-hook-form';
import { useState, useMemo } from 'react';
import { Button, Form, Input, Select, Table, Radio, Card, InputNumber, message } from 'antd';
import { ConfirmOrder } from './ConfirmOrder'; 
import { products, promotions } from '../data/mockData';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderSchema } from '../validations/orderSchema';

interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  promotionId?: string;
}

interface OrderForm {
  customer: { name: string; email: string; phone: string };
  cart: CartItem[];
  paymentMethod: 'cash' | 'card';
  cashAmount?: number;
}

function CreateOrder() {
  const { control, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<OrderForm>({
    defaultValues: {
      customer: { name: '', email: '', phone: '' },
      cart: [],
      paymentMethod: 'cash',
      cashAmount: undefined,
    },
    resolver: yupResolver(orderSchema) as Resolver<OrderForm>,
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'cart' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    append({ productId: '', quantity: 1, price: 0, promotionId: '' });
  };

  // Tính tổng tiền từng sản phẩm (áp mã khuyến mãi)
  const calculateItemTotal = (item: CartItem) => {
    let total = item.price * item.quantity;
    const promo = promotions.find(p => p.id === item.promotionId);
    if (promo) {
      total = promo.type === 'PERCENTAGE' ? total * (1 - promo.value / 100) : Math.max(0, total - promo.value);
    }
    return total;
  };

  // Tính tổng tiền toàn bộ đơn hàng
  const totalAmount = useMemo(() => {
    return getValues('cart').reduce((sum, item) => sum + calculateItemTotal(item), 0);
  }, [watch('cart')]);

  const onSubmit = (data: OrderForm) => {
    console.log('Đơn hàng:', data);
    setShowConfirmModal(true);
  };

  const onError = () => {
    console.log('Vui lòng kiểm tra lại thông tin đơn hàng');
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <Form layout="vertical" onFinish={handleSubmit(onSubmit, onError)} style={{ maxWidth: 800, margin: 'auto' }}>
      <h2>Tạo Đơn Hàng</h2>

      {/* Thông tin khách hàng */}
      <Form.Item 
        label="Tên khách hàng" 
        validateStatus={errors.customer?.name ? 'error' : undefined}
        help={errors.customer?.name?.message}
      >
        <Controller 
          name="customer.name" 
          control={control} 
          render={({ field }) => <Input {...field} />} 
        />
      </Form.Item>
      
      <Form.Item 
        label="Email" 
        validateStatus={errors.customer?.email ? 'error' : undefined}
        help={errors.customer?.email?.message}
      >
        <Controller 
          name="customer.email" 
          control={control} 
          render={({ field }) => <Input {...field} />} 
        />
      </Form.Item>
      
      <Form.Item 
        label="Số điện thoại" 
        validateStatus={errors.customer?.phone ? 'error' : undefined}
        help={errors.customer?.phone?.message}
      >
        <Controller 
          name="customer.phone" 
          control={control} 
          render={({ field }) => <Input {...field} />} 
        />
      </Form.Item>

      {/* Giỏ hàng */}
      <Button type="dashed" onClick={handleAddToCart}>Thêm sản phẩm</Button>
      
      {errors.cart && errors.cart.message && (
        <div style={{ color: 'red', marginTop: 8 }}>{errors.cart.message}</div>
      )}

      <Table 
        dataSource={fields.map((field, index) => ({
          ...field,
          key: field.id,
          index
        }))}
        pagination={false}
        columns={[
          {
            title: 'Sản phẩm',
            dataIndex: 'productId',
            key: 'productId',
            render: (_, record: any) => (
              <Form.Item
                validateStatus={errors.cart?.[record.index]?.productId ? 'error' : undefined}
                help={errors.cart?.[record.index]?.productId?.message}
                style={{ marginBottom: 0 }}
              >
                <Controller
                  name={`cart.${record.index}.productId`}
                  control={control}
                  render={({ field }) => (
                    <Select {...field} style={{ width: '100%' }}>
                      {products.map(p => <Select.Option key={p.id} value={p.id}>{p.name}</Select.Option>)}
                    </Select>
                  )}
                />
              </Form.Item>
            )
          },
          {
            title: 'Đơn giá',
            dataIndex: 'price',
            key: 'price',
            render: (_, record: any) => (
              <Form.Item
                validateStatus={errors.cart?.[record.index]?.price ? 'error' : undefined}
                help={errors.cart?.[record.index]?.price?.message}
                style={{ marginBottom: 0 }}
              >
                <Controller 
                  name={`cart.${record.index}.price`} 
                  control={control} 
                  render={({ field }) => <InputNumber {...field} />} 
                />
              </Form.Item>
            )
          },
          {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (_, record: any) => (
              <Form.Item
                validateStatus={errors.cart?.[record.index]?.quantity ? 'error' : undefined}
                help={errors.cart?.[record.index]?.quantity?.message}
                style={{ marginBottom: 0 }}
              >
                <Controller 
                  name={`cart.${record.index}.quantity`} 
                  control={control} 
                  render={({ field }) => <InputNumber {...field} />} 
                />
              </Form.Item>
            )
          },
          {
            title: 'Khuyến mãi',
            dataIndex: 'promotionId',
            key: 'promotionId',
            render: (_, record: any) => (
              <Controller
                name={`cart.${record.index}.promotionId`}
                control={control}
                render={({ field }) => (
                  <Select {...field} className="w-full">
                    <Select.Option value="">Không áp dụng</Select.Option>
                    {promotions.map(p => <Select.Option key={p.id} value={p.id}>{p.code}</Select.Option>)}
                  </Select>
                )}
              />
            )
          },
          {
            title: 'Thành tiền',
            key: 'total',
            render: (_, record: any) => `$${calculateItemTotal(getValues(`cart.${record.index}`)).toFixed(2)}`
          },
          {
            title: 'Xóa',
            key: 'action',
            render: (_, record: any) => (
              <Button type="primary" danger onClick={() => remove(record.index)}>Xóa</Button>
            )
          }
        ]}
      />

      {/* Phương thức thanh toán */}
      <Form.Item 
        label="Phương thức thanh toán"
        validateStatus={errors.paymentMethod ? 'error' : undefined}
        help={errors.paymentMethod?.message}
      >
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field}>
              <Radio value="cash">Tiền mặt</Radio>
              <Radio value="card">Thẻ</Radio>
            </Radio.Group>
          )}
        />
      </Form.Item>

      {watch('paymentMethod') === 'cash' && (
        <Form.Item 
          label="Tiền khách đưa"
          validateStatus={errors.cashAmount ? 'error' : undefined}
          help={errors.cashAmount?.message}
        >
          <Controller 
            name="cashAmount" 
            control={control} 
            render={({ field }) => <InputNumber {...field} />} 
          />
        </Form.Item>
      )}

      {/* Nút thanh toán */}
      <Button type="primary" htmlType="submit">Hoàn tất thanh toán</Button>

      {showConfirmModal && <ConfirmOrder order={{
        customerName: getValues('customer.name'),
        email: getValues('customer.email'),
        phone: getValues('customer.phone'),
        cart: getValues('cart'),
        paymentMethod: getValues('paymentMethod') === 'cash' ? 'CASH' : 'CARD',
        cashAmount: getValues('cashAmount'),
      }} />}
    </Form>
    </div>
  );
}

export { CreateOrder };