'use client';

import ShoppingCartIcon from '@/assets/svg/ShoppingCart';
import { formatNumber } from '@/utils/common';
type Props = {
  onLogout?: () => void;
};

export default function ShoppingCart({ onLogout }: Props) {
  const product = [
    {
      id: 1,
      name: 'acer nitro 5',
      description:
        'Laptop Acer Nitro 5 Gaming AN515-58-59L1 (Core i5-12500H/8GB RAM/512GB SSD/RTX 3050 4GB/15.6" FHD IPS 144Hz/W10/Đen)',
      actualPrice: 17990000,
      discountedPrice: 16990000,
      image: '/assets/png/acer-nitro-5.png',
    },
    {
      id: 2,
      name: 'LOQ 2024',
      description:
        'LOQ 2024 Gaming Laptop (Intel Core i7-13700H/16GB RAM/1TB SSD/RTX 4060 8GB/16.0" QHD 165Hz/W11/Black)',
      actualPrice: 31990000,
      discountedPrice: 30990000,
      image: '/assets/png/loq-2024.png',
    },
  ];
  return (
    <div className="bg-[var(--bg-secondary)] rounded-[0.8rem] overflow-hidden w-full h-full relative">
      <div className="absolute left-[2rem] top-[2rem] flex flex-col items-start justify-center mr-[1rem]">
        <div className="flex gap-[0.8rem] h-[4.8rem] items-center px-0 py-[0.8rem] rounded-[1.2rem] w-[22.4rem]">
          <div className="bg-gradient-to-r from-[var(--bg-gradient-icon-from)] via-[var(--bg-gradient-icon-via)] to-[var(--bg-gradient-icon-to)] flex items-center justify-center rounded-[1.6rem] size-[4rem]">
            <ShoppingCartIcon className="text-[#FFFFFF] size-[2rem]" />
          </div>
          <p className="text-[1.6rem] font-[400] leading-[1.4] text-[var(--text-primary)] whitespace-nowrap">
            Giỏ hàng của bạn
          </p>
        </div>
        <div className="flex flex-col gap-[3rem] mt-[2rem]">
          {product?.map((item, index) => {
            return (
              <div className="flex justify-between" key={item?.id}>
                <div className="flex flex-col gap-[1rem] max-w-[60%]">
                  <div className="uppercase text-[1.6rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
                    {item?.name}
                  </div>
                  <div>{item?.description}</div>
                </div>
                <div className="flex flex-col gap-[1rem]">
                  <div className="text-[#ED3636] line-through">
                    {formatNumber(item?.actualPrice)} VNĐ
                  </div>
                  <div className="text-[#09E384] font-bold">
                    {formatNumber(item?.discountedPrice)} VNĐ
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
