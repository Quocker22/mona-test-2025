import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Form, Input } from 'antd';

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  error?: { message?: string };
  className?: string;
  type?: string;
}

const FormInput = <T extends FieldValues>({ 
  control, 
  name, 
  label, 
  error,
  className = 'flex-1',
  type = 'text'
}: FormInputProps<T>) => {
  return (
    <Form.Item
      label={label}
      validateStatus={error ? 'error' : undefined}
      help={error?.message}
      className={className}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => <Input {...field} type={type} />}
      />
    </Form.Item>
  );
};

export default FormInput; 