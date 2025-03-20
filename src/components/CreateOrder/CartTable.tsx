import { Controller, Control, FieldErrors, useFieldArray, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { Button, Form, Select, InputNumber, Table } from 'antd';
import { OrderForm, CartItem, Product, Promotion } from '../../types';
import { DeleteOutlined, InboxOutlined, PlusOutlined } from '@ant-design/icons';
import { formatNumber } from '@/utils/format';
import FormSelect from '../common/FormSelect';

interface CartTableProps {
  control: Control<OrderForm>;
  errors: FieldErrors<OrderForm>;
  products: Product[];
  promotions: Promotion[];
  calculateItemTotal: (item: CartItem) => number;
  getValues: UseFormGetValues<OrderForm>;
  setValue: UseFormSetValue<OrderForm>
}

interface CartTableRecord extends CartItem {
  id: string;
  index: number;
}

const CartTable = ({
  control,
  errors,
  products,
  promotions,
  calculateItemTotal,
  getValues,
  setValue
}: CartTableProps) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'cart'
  });

  const handleAddToCart = () => {
    append({ productId: '', quantity: 1 });
  };

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'productId',
      key: 'productId',
      width: '30%',
      render: (_: unknown, record: CartTableRecord) => (
        <FormSelect<OrderForm>
          control={control}
          name={`cart.${record.index}.productId` as const}
          error={errors.cart?.[record.index]?.productId}
          options={products}
          displayKey="name"
          onChange={(value, product) => {
            setValue(`cart.${record.index}.price`, product.price || 0);
          }}
        />
      )
    },
    {
      title: 'Đơn giá',
      dataIndex: 'price',
      key: 'price',
      width: '15%',
      render: (_: unknown, record: CartTableRecord) => {
        const productId = getValues(`cart.${record.index}.productId`);
        const selectedProduct = products.find(p => p.id === productId);
        const price = selectedProduct?.price || 0;

        return (
          <div className="mb-6">
            {formatNumber(price)}
            <Controller
              name={`cart.${record.index}.price` as const}
              control={control}
              render={({ field }) => <InputNumber className='!hidden' {...field} />}
            />
          </div>
        );
      }
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      width: '15%',
      render: (_: unknown, record: CartTableRecord) => (
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
      width: '20%',
      render: (_: unknown, record: CartTableRecord) => (
        <div className='mb-6'>
          <FormSelect<OrderForm>
            control={control}
            name={`cart.${record.index}.promotionId` as const}
            error={errors.cart?.[record.index]?.promotionId}
            options={[{ id: '', name: 'Không áp dụng' }, ...promotions]}
            displayKey="code"
          />
        </div>
      )
    },
    {
      title: 'Thành tiền',
      key: 'total',
      width: '25%',
      render: (_: unknown, record: CartTableRecord) => <div className='mb-6'>{formatNumber(calculateItemTotal(getValues(`cart.${record.index}`)))}</div>
    },
    {
      key: 'action',
      width: '10%',
      render: (_: unknown, record: CartTableRecord) => (
        <Button type="primary" className='mb-6' danger onClick={() => remove(record.index)}><DeleteOutlined /></Button>
      )
    }
  ]

  return (
    <>
      <div className="flex justify-end w-full">
        <Button type="dashed" onClick={handleAddToCart}><PlusOutlined /> Thêm sản phẩm</Button>
      </div>

      {errors.cart && errors.cart.message && (
        <div className='text-end text-red-500' >{errors.cart.message}</div>
      )}

      <Table
        dataSource={fields.map((field, index) => ({
          ...field,
          key: field.id,
          index
        }))}
        locale={{
          emptyText: <div className='flex flex-col items-center justify-center text-center'> <InboxOutlined className='text-3xl' /> Không có sản phẩm</div>
        }}
        pagination={false}
        columns={columns}
      />
    </>
  );
};

export { CartTable }; 