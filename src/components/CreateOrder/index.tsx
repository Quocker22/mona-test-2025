"use client"

import { Resolver, useForm } from 'react-hook-form';
import { useState, useMemo } from 'react';
import { Button, Form, Card, message } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { orderSchema } from '../../validations/orderSchema';
import { products, promotions } from '../../data/mockData';
import { ConfirmOrder } from '../ConfirmOrder';
import CustomerInfo from './CustomerInfo';
import CartTable from './CartTable';
import PaymentMethod from './PaymentMethod';
import { OrderForm, CartItem } from '../../types';

function CreateOrder() {
    const { control, handleSubmit, watch, getValues, formState: { errors } } = useForm<OrderForm>({
        defaultValues: {
            customerName: '',
            email: '',
            phone: '',
            cart: [],
            paymentMethod: 'CASH',
            cashAmount: undefined,
        },
        resolver: yupResolver(orderSchema) as Resolver<OrderForm>,
    });

    const [showConfirmModal, setShowConfirmModal] = useState(false);

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

    const onError = (errors: any) => {
        console.error('Form errors:', errors);
        message.error('Vui lòng kiểm tra lại thông tin đơn hàng');
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow-md">
            <Form layout="vertical" onFinish={handleSubmit(onSubmit, onError)} style={{ maxWidth: 800, margin: 'auto' }}>
                <h2>Tạo Đơn Hàng</h2>

                {/* Thông tin khách hàng */}
                <CustomerInfo control={control} errors={errors} />

                {/* Giỏ hàng */}
                <CartTable
                    control={control}
                    errors={errors}
                    products={products}
                    promotions={promotions}
                    calculateItemTotal={calculateItemTotal}
                    getValues={getValues}
                />

                {/* Phương thức thanh toán */}
                <PaymentMethod
                    control={control}
                    errors={errors}
                    watch={watch}
                />

                {/* Tổng tiền */}
                <Card style={{ padding: 16, marginTop: 16 }}>
                    <h3>Tổng Tiền: ${totalAmount.toFixed(2)}</h3>
                </Card>

                {/* Nút thanh toán */}
                <Button type="primary" htmlType="submit">Hoàn tất thanh toán</Button>

                {showConfirmModal && (
                    <ConfirmOrder
                        order={{
                            customerName: getValues('customerName'),
                            email: getValues('email'),
                            phone: getValues('phone'),
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