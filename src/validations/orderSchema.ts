import * as yup from 'yup';
import { promotions } from '../data/mockData';
import { CartItem } from '@/types';

export const orderSchema = yup.object().shape({
  customer: yup.object().shape({
    name: yup.string().required('Tên khách hàng là bắt buộc'),
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    phone: yup.string().matches(/^[0-9]{10}$/, 'Số điện thoại phải có 10 chữ số').required('Số điện thoại là bắt buộc'),
  }),
  cart: yup.array().of(
    yup.object().shape({
      productId: yup.string().required('Vui lòng chọn sản phẩm'),
      quantity: yup.number().positive('Số lượng phải lớn hơn 0').required('Số lượng là bắt buộc'),
      price: yup.number().positive('Đơn giá phải lớn hơn 0').required('Đơn giá là bắt buộc'),
    })
  ).min(1, 'Vui lòng thêm ít nhất một sản phẩm vào giỏ hàng'),
  paymentMethod: yup.string().required('Vui lòng chọn phương thức thanh toán'),
  cashAmount: yup.number().when('paymentMethod', {
    is: 'CASH',
    then: (schema) => schema
      .required('Vui lòng nhập số tiền khách đưa')
      .positive('Số tiền phải lớn hơn 0')
      .test(
        'is-greater-than-total',
        'Số tiền khách đưa phải lớn hơn hoặc bằng tổng tiền',
        function (value) {
          const cart = this.parent.cart || [];
          const totalAmount = cart.reduce((sum: number, item: CartItem) => {
            let total = (item.price || 0) * item.quantity;
            const promo = promotions.find(p => p.id === item.promotionId);
            if (promo) {
              total = promo.type === 'PERCENTAGE' ? total * (1 - promo.value / 100) : Math.max(0, total - promo.value);
            }
            return sum + total;
          }, 0);
          return value >= totalAmount;
        }
      ),
  }),
}); 