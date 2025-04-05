"use client"

import { CreateOrder } from '@/components/CreateOrder';
import Image from 'next/image';

export default function Quoc() {
  return (
    <main className="min-h-screen bg-[#e7ecf1]">
      <div className="max-w-5xl mx-auto">
        {/* Header with logo */}
        <div className="bg-white h-[57px] px-4 mb-4 shadow-lg flex items-center">
          <Image
            src="https://sinhvien.huit.edu.vn/Content/AConfig/images/sv_logo_dashboard.png"
            alt="HUIT Logo"
            width={150}
            height={50}
            className="h-auto"
          />
          <div className="ml-auto flex items-center">
            {/* Dropdown icon */}
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Menu icon */}
            <button className="p-2 ml-2 text-gray-600 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Student Information Card */}
      <div className="bg-white p-2 mx-3 rounded shadow-lg mb-4">
        <h2 className="text-[18px] font-[900] py-2 border-b-1 border-gray-200 text-gray-600 mb-6">Thông tin sinh viên</h2>

        <div className="flex flex-col md:flex-row items-center mb-4">
          <div className="w-[120px] h-[120px] rounded-full overflow-hidden mb-2 md:mb-0">
            <div className="w-full h-full bg-blue-500 flex items-center justify-center">
              <Image
                src="/quoc.png"
                alt="HUIT Logo"
                width={120}
                height={120}
                className="h-auto"
              />
            </div>
          </div>

          <div className="md:ml-8 w-full">
            <a href="#" className="text-[#1da1f2] text-[12px] block text-center md:text-left mb-4">Xem chi tiết</a>

            <div className="grid grid-cols-2 gap-2 px-2">
              <div className='flex flex-col gap-2'>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">MSSV:</span> 2001216086</p>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Họ tên:</span> Đinh Việt Quốc</p>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Giới tính:</span> Nam</p>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Ngày sinh:</span> 20/01/2003</p>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Nơi sinh:</span> Tỉnh Thanh Hóa</p>
              </div>
              <div className='flex flex-col gap-2'>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Lớp học:</span> 12DHDT03</p>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Khóa học:</span> 2021</p>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Bậc đào tạo:</span> Đại học</p>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Loại hình đào tạo:</span> Chính quy</p>
                <p className='text-[#47525a] text-[14px] font-[700]'><span className="text-[#939090] text-[12px] font-[600]">Ngành:</span> Công nghệ kỹ thuật điện - điện tử</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-[15px] mx-3 rounded shadow-lg mb-4">
        <p className="text-gray-500 text-[12px] mb-2">Nhắc nhở mới, chưa xem</p>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl text-gray-500 font-bold">0</h2>
          <button className="p-2 rounded-full border border-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
        <a href="#" className="text-[12px] text-[#1da1f2]">Xem chi tiết</a>
      </div>

      <div className='grid grid-cols-2 gap-4 px-3'>
        <div className=" p-[15px] rounded shadow-lg mb-4 flex-1 bg-[#e0fbff]">
          <p className="text-[#1da1f2] text-[12px] mb-2">Lịch học trong tuần</p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-[#1da1f2] font-bold">9</h2>
            <button className="p-2 rounded-full border border-[#1da1f2]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#1da1f2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <a href="#" className="text-[12px] text-[#1da1f2]">Xem chi tiết</a>
        </div>
        <div className=" p-[15px] rounded shadow-lg mb-4 flex-1 bg-[#fff2d4]">
          <p className="text-[#ff9205] text-[12px] mb-2">Lịch thi trong tuần</p>
          <div className="flex justify-between items-center">
            <h2 className="text-4xl text-[#ff9205] font-bold">0</h2>
            <button className="p-2 rounded-full border border-[#ff9205]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#ff9205]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
          <a href="#" className="text-[12px] text-[#ff9205]">Xem chi tiết</a>
        </div>
      </div>
    </main>
  );
}

