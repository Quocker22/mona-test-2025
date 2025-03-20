import { Controller, Control, FieldErrors, useFieldArray, UseFormGetValues } from 'react-hook-form';
import { Button, Form, Select, InputNumber, Table } from 'antd';
import { OrderForm, CartItem, Product, Promotion } from '../../types';

interface CartTableProps {
  control: Control<OrderForm>;
  errors: FieldErrors<OrderForm>;
  products: Product[];
  promotions: Promotion[];
  calculateItemTotal: (item: CartItem) => number;
  getValues: UseFormGetValues<OrderForm>;
}

const CartTable = ({
  control,
  errors,
  products,
  promotions,
  calculateItemTotal,
  getValues
}: CartTableProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cart'
  });

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCart = () => {
    append({ productId: '', quantity: 1, price: 0, promotionId: '' });
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      key: 'productId',
      render: (_, record: any) => (
        <Form.Item
          validateStatus={errors.cart?.[record.index]?.productId ? 'error' : undefined}
          help={errors.cart?.[record.index]?.productId?.message}
        >
          <Controller
            name={`cart.${record.index}.productId` as const}
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
          
        >
          <Controller
            name={`cart.${record.index}.price` as const}
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
          
        >
          <Controller
            name={`cart.${record.index}.quantity` as const}
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
          name={`cart.${record.index}.promotionId` as const}
          control={control}
          render={({ field }) => (
            <Select {...field} style={{ width: '100%' }}>
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
  ]

  return (
    <>
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
        columns={columns}
      />
    </>
  );
};

export default CartTable; 