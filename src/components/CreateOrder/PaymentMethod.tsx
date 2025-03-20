import { Controller } from 'react-hook-form';
import { Form, Radio, InputNumber } from 'antd';

interface PaymentMethodProps {
  control: any;
  errors: any;
  watch: any;
}

const PaymentMethod = ({ control, errors, watch }: PaymentMethodProps) => {
  return (
    <>
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
    </>
  );
};

export default PaymentMethod; 