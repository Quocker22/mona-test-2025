import { Controller } from 'react-hook-form';
import { Form, Input } from 'antd';

interface CustomerInfoProps {
  control: any;
  errors: any;
}

const CustomerInfo = ({ control, errors }: CustomerInfoProps) => {
  return (
    <>
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
    </>
  );
};

export default CustomerInfo; 