import { Control, Controller, FieldValues, Path, PathValue } from 'react-hook-form';
import { Form, Select } from 'antd';

interface Option {
  id: string | number;
  name?: string;
  code?: string;
  value?: number;
  price?: number;
}

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  error?: { message?: string };
  options: Option[];
  placeholder?: string;
  className?: string;
  onChange?: (value: PathValue<T, Path<T>>, option: Option) => void;
  displayKey?: 'name' | 'code';
  allowClear?: boolean;
}

const FormSelect = <T extends FieldValues>({
  control,
  name,
  label,
  error,
  options,
  placeholder,
  className = 'w-full',
  onChange,
  displayKey = 'name',
  allowClear
}: FormSelectProps<T>) => {

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
        render={({ field }) => (
          <Select
            {...field}
            style={{ width: '100%' }}
            placeholder={placeholder}
            allowClear={allowClear}
            onChange={(value) => {
              field.onChange(value);
              if (onChange) {
                const selectedOption = options.find(opt => opt.id === value);
                if (selectedOption) {
                  onChange(value, selectedOption);
                }
              }
            }}
          >
            {options.map(option => (
              <Select.Option key={option.id} value={option.id}>
                {option[displayKey] || option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      />
    </Form.Item>
  );
};

export default FormSelect; 