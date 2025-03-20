import { Control, Controller, FieldErrors } from 'react-hook-form';
import { Form, Input } from 'antd';
import { OrderForm } from '@/types';
import FormInput from '@/components/common/FormInput';

interface CustomerInfoProps {
  control: Control<OrderForm>;
  errors: FieldErrors<OrderForm>;
}

const CustomerInfo = ({ control, errors }: CustomerInfoProps) => {
  return (
    <div className='flex flex-row w-full gap-4'>
      <FormInput<OrderForm>
        control={control}
        name="customer.name"
        label="Tên khách hàng"
        error={errors.customer?.name}
      />

      <FormInput<OrderForm>
        control={control}
        name="customer.email"
        label="Email"
        error={errors.customer?.email}
      />

      <FormInput<OrderForm>
        control={control}
        name="customer.phone"
        label="Số điện thoại"
        error={errors.customer?.phone}
      />
    </div>
  );
};

export { CustomerInfo }; 