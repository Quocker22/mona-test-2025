import { Control, UseFormWatch, Controller, FieldErrors } from 'react-hook-form';
import { Form, Radio, InputNumber } from 'antd';
import { OrderForm } from '@/types';
import FormInput from '../common/FormInput';

interface PaymentMethodProps {
  control: Control<OrderForm>;
  errors: FieldErrors<OrderForm>;
  watch: UseFormWatch<OrderForm>;
}

const PaymentMethod = ({ control, errors, watch }: PaymentMethodProps) => {
  return (
    <div className='flex flex-row gap-2 w-full items-end'>
      <Form.Item
        label="Phương thức thanh toán"
        validateStatus={errors.paymentMethod ? 'error' : undefined}
        help={errors.paymentMethod?.message}
      >
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <Radio.Group {...field} >
              <div className='flex flex-col gap-2'>
                <Radio value="CASH">Tiền mặt</Radio>
                <Radio value="CARD">Thẻ</Radio>
              </div>
            </Radio.Group>
          )}
        />
      </Form.Item>

      {watch('paymentMethod') === 'CASH' && (
        <Form.Item
          label="Tiền khách đưa"
          validateStatus={errors.cashAmount ? 'error' : undefined}
          help={errors.cashAmount?.message}
          className='w-2/5'
        >
          <Controller
            name="cashAmount"
            control={control}
            render={({ field }) => <InputNumber {...field} className='!w-full' />}
          />
        </Form.Item>
      )}
    </div>
  );
};

export { PaymentMethod }; 