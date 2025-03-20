import { CreateOrder } from '@/components/CreateOrder';

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <CreateOrder />
      </div>
    </main>
  );
}

