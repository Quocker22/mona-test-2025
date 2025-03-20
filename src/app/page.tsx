import { CreateOrder } from '@/components/CreateOrder';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Hệ thống quản lý đơn hàng</h1>
        <CreateOrder />
      </div>
    </main>
  );
}

