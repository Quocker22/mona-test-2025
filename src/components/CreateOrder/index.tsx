"use client"

import { Resolver, useForm } from 'react-hook-form';
import { useState, useMemo } from 'react';
import { Button, Form, Card } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderSchema } from '../../validations/orderSchema';
import { products, promotions } from '../../data/mockData';
import { ConfirmOrder } from '../ConfirmOrder';
import { CustomerInfo } from './CustomerInfo';
import { CartTable } from './CartTable';
import { PaymentMethod } from './PaymentMethod';
import { OrderForm, CartItem } from '../../types';
import { formatNumber } from '@/utils/format';

const defaultValues: OrderForm = {
    customer: {
        name: '',
        email: '',
        phone: '',
    },
    cart: [],
    paymentMethod: 'CASH',
    cashAmount: undefined,
}

function CreateOrder() {
    const { control, handleSubmit, watch, getValues, setValue, formState: { errors } } = useForm<OrderForm>({
        defaultValues,
        resolver: yupResolver(orderSchema) as Resolver<OrderForm>,
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const calculateItemTotal = (item: CartItem) => {
        let total = (item?.price || 0) * item.quantity;
        const promo = promotions.find(p => p.id === item.promotionId);
        if (promo) {
            total = promo.type === 'PERCENTAGE' ? total * (1 - promo.value / 100) : Math.max(0, total - promo.value);
        }
        return total;
    };

    const totalAmount = useMemo(() => {
        const cart = watch('cart');
        return cart.reduce((sum: number, item: CartItem) => sum + calculateItemTotal(item), 0);
    }, [watch('cart'), calculateItemTotal]);

    const onSubmit = (data: OrderForm) => {
        
        setShowConfirmModal(true);
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-md">
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className='flex flex-col gap-4 !w-full'>
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Hệ thống quản lý đơn hàng</h1>

                <CustomerInfo control={control} errors={errors} />

                <CartTable
                    control={control}
                    errors={errors}
                    products={products}
                    promotions={promotions}
                    calculateItemTotal={calculateItemTotal}
                    getValues={getValues}
                    setValue={setValue}
                />

                <Card className='flex flex-row justify-end'>
                    <h3>Tổng tiền: <span className='font-bold'>{formatNumber(totalAmount)}</span></h3>
                </Card>

                <PaymentMethod
                    control={control}
                    errors={errors}
                    watch={watch}
                />

                <Button type="primary" size='large' htmlType="submit">Hoàn tất thanh toán</Button>

                {showConfirmModal && (
                    <ConfirmOrder
                        order={{
                            customer: getValues('customer'),
                            cart: getValues('cart'),
                            paymentMethod: getValues('paymentMethod'),
                            cashAmount: getValues('cashAmount'),
                        }}
                        onClose={() => setShowConfirmModal(false)}
                    />
                )}
            </Form>
        </div>
    );
}

export { CreateOrder }; 