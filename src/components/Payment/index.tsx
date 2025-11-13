'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@heroui/button';

import PackageIcon from '@/assets/svg/PackageIcon';
import CalendarIcon from '@/assets/svg/CalendarIcon';
import HelpIcon from '@/assets/svg/HelpIcon';

type PaymentMethod = 'vnpay-wallet' | 'vnpay-qr' | 'atm' | 'credit-card';

type Props = {
  planName?: string;
  billingCycle?: string;
  totalAmount?: string;
  onClose: () => void;
};

export default function Payment({
  planName = 'Gói tiêu chuẩn',
  billingCycle = '6 tháng',
  totalAmount = '12,000,000',
  onClose,
}: Props) {
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('credit-card');
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [cardNumber, setCardNumber] = useState<string>('');
  const [expiryDate, setExpiryDate] = useState<string>('');
  const [cvv, setCvv] = useState<string>('');

  const paymentMethods = [
    {
      id: 'vnpay-wallet' as PaymentMethod,
      label: 'Ví điện tử VNPAY',
      icon: (
        <div className="relative size-[2.7rem] rounded-[0.8rem] overflow-hidden opacity-40">
          <Image
            src="/assets/png/vnpay.png"
            alt="VNPAY"
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      id: 'vnpay-qr' as PaymentMethod,
      label: 'VNPAY - QR',
      icon: (
        <div className="relative size-[2.7rem] rounded-[0.8rem] overflow-hidden opacity-40">
          <Image
            src="/assets/png/vnpay.png"
            alt="VNPAY"
            fill
            className="object-cover"
          />
        </div>
      ),
    },
    {
      id: 'atm' as PaymentMethod,
      label: 'Thẻ ATM nội địa',
      icon: (
        <div className="bg-white size-[2.7rem] rounded-[0.8rem] flex items-center justify-center opacity-40 p-[0.8rem]">
          <svg
            className="size-[1.9rem]"
            fill="none"
            viewBox="0 0 19 13"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 3.5H17.5M1.5 7H17.5M1.5 10.5H17.5M1.5 1H17.5V12H1.5V1Z"
              stroke="#1976D2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </div>
      ),
    },
    {
      id: 'credit-card' as PaymentMethod,
      label: 'Thẻ tín dụng',
      icon: (
        <div className="bg-white size-[2.7rem] rounded-[0.8rem] overflow-hidden flex items-center justify-center">
          <Image
            src="/assets/png/visa.png"
            alt="VISA"
            width={22}
            height={7}
            className="object-contain"
          />
        </div>
      ),
    },
  ];

  const banks = [
    { id: 'bidv', name: 'BIDV', image: '/assets/png/bidv.png' },
    { id: 'vietinbank', name: 'VietinBank', image: '/assets/png/bidv.png' },
    { id: 'vpbank', name: 'VPBank', image: '/assets/png/bidv.png' },
    { id: 'techcombank', name: 'Techcombank', image: '/assets/png/bidv.png' },
    { id: 'shb', name: 'SHB', image: '/assets/png/bidv.png' },
    { id: 'hdbank', name: 'HDBank', image: '/assets/png/bidv.png' },
    { id: 'acb', name: 'ACB', image: '/assets/png/bidv.png' },
    { id: 'mb', name: 'MB', image: '/assets/png/bidv.png' },
    { id: 'vib', name: 'VIB', image: '/assets/png/bidv.png' },
    { id: 'scb', name: 'SCB', image: '/assets/png/bidv.png' },
    { id: 'sacombank', name: 'Sacombank', image: '/assets/png/bidv.png' },
    { id: 'tpbank', name: 'TPBank', image: '/assets/png/bidv.png' },
    { id: 'vib2', name: 'VIB', image: '/assets/png/bidv.png' },
    { id: 'msb', name: 'MSB', image: '/assets/png/bidv.png' },
  ];

  return (
    <div className="bg-[var(--bg-payment-main)] rounded-[2rem] overflow-hidden w-full h-full p-[3.2rem]">
      {/* Header */}
      <div className="mb-[2.5rem]">
        <h2 className="text-[2.4rem] font-[600] leading-[1.2] text-[var(--text-secondary)]">
          Thanh toán
        </h2>
      </div>

      {/* Order Summary */}
      <div className="bg-[var(--bg-primary)] rounded-[0.8rem] p-[2.4rem] mb-[1.5rem]">
        <div className="grid grid-cols-3">
          {/* Product */}
          <div className="flex flex-col gap-[1.6rem] w-[16.8rem]">
            <p className="text-[1.6rem] font-[500] leading-[1.4] text-[var(--text-tertiary)]">
              Sản phẩm
            </p>
            <div className="flex items-center gap-[0.9rem]">
              <div className="bg-gradient-to-r from-[var(--bg-gradient-icon-from)] from-[17.671%] via-[var(--bg-gradient-icon-via)] via-[57.889%] to-[var(--bg-gradient-icon-to)] to-[125.21%] rounded-[1.2rem] size-[3.2rem] flex items-center justify-center">
                <PackageIcon />
              </div>
              <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
                {planName}
              </p>
            </div>
          </div>

          {/* Billing Cycle */}
          <div className="flex flex-col gap-[1.6rem] w-[13.7rem]">
            <p className="text-[1.6rem] font-[500] leading-[1.4] text-[var(--text-tertiary)]">
              Chu kỳ thanh toán
            </p>
            <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
              {billingCycle}
            </p>
          </div>

          {/* Total Price */}
          <div className="flex flex-col gap-[1.6rem] w-[14.2rem]">
            <p className="text-[1.6rem] font-[500] leading-[1.4] text-[var(--text-tertiary)]">
              Thành tiền
            </p>
            <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-primary)]">
              {totalAmount} VNĐ
            </p>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-[var(--bg-primary)] rounded-[0.8rem] p-[2.4rem] pb-[9.8rem] mb-[2.8rem] flex flex-row gap-[5.4rem]">
        <p className="text-[2rem] font-[700] leading-[1.2] text-[var(--text-primary)] mb-[2.4rem] whitespace-nowrap">
          Phương thức thanh toán
        </p>
        <div className="flex flex-col">
          {/* Payment Method Options */}
          <div className="flex gap-[2.4rem] mb-[3.2rem] flex-wrap">
            {paymentMethods.map(method => {
              const isSelected = paymentMethod === method.id;

              return (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`rounded-[0.8rem] p-[1.2rem] flex items-center justify-between w-[27.2rem] cursor-pointer bg-[var(--bg-payment-main)]`}
                >
                  <div className="flex items-center gap-[0.8rem]">
                    {method.icon}
                    <p
                      className={`text-[1.6rem] font-[500] leading-[1.4] ${
                        isSelected
                          ? 'text-[var(--text-primary)]'
                          : 'text-[var(--text-tertiary)]'
                      }`}
                    >
                      {method.label}
                    </p>
                  </div>
                  <div
                    className={`size-[1.8rem] rounded-full flex items-center justify-center ${
                      isSelected
                        ? 'border-[0.2rem] border-[var(--brand-gradient-start)]'
                        : 'border-[0.2rem] border-[var(--text-tertiary)]'
                    }`}
                  >
                    {isSelected && (
                      <div className="size-[0.8rem] rounded-full bg-gradient-to-b from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bank Selection */}
          <div>
            <p className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)] mb-[1.5rem]">
              Danh sách ngân hàng hỗ trợ thanh toán
            </p>

            {!selectedBank ? (
              /* Bank List - Step 1 */
              <div className="flex flex-wrap gap-[2.4rem]">
                {banks.map(bank => (
                  <button
                    key={bank.id}
                    //TODO
                    onClick={() =>
                      bank.id === 'bidv' && setSelectedBank(bank.id)
                    }
                    className={`bg-[var(--bg-secondary)] border-[0.06rem] border-[var(--border-bank)] rounded-[0.72rem] w-[10rem] h-[6.8rem] flex items-center justify-center ${
                      bank.id === 'bidv'
                        ? 'cursor-pointer'
                        : 'cursor-not-allowed opacity-40'
                    }`}
                  >
                    <div className="relative w-[8.31rem] h-[5.36rem] bg-[var(--border-active)] rounded-[0.48rem] overflow-hidden flex justify-center items-center">
                      <Image
                        src={bank.image}
                        alt={bank.name}
                        width={54}
                        height={30}
                        className="object-contain !w-[5.4rem]"
                      />
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              /* Selected Bank + Card Form - Step 2 */
              <div className="flex flex-col gap-[1.4rem]">
                {/* Selected Bank Display */}
                <div className="flex items-center gap-[1.6rem]">
                  <div className="bg-[var(--bg-secondary)] border-[0.06rem] border-[var(--border-bank)] rounded-[0.72rem] w-[10rem] h-[6.8rem] flex items-center justify-center">
                    <div className="relative w-[8.31rem] h-[5.36rem] bg-[var(--border-active)] rounded-[0.48rem] overflow-hidden flex justify-center items-center">
                      <Image
                        src="/assets/png/bidv.png"
                        alt="BIDV"
                        width={54}
                        height={30}
                        className="object-contain !w-[5.4rem]"
                      />
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedBank('')}
                    className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)] underline cursor-pointer"
                  >
                    Thay đổi
                  </button>
                </div>

                {/* Card Information Form */}
                <div className="flex flex-col gap-[1.4rem] mt-[2.4rem]">
                  {/* Card Number */}
                  <div className="flex flex-col gap-[1.2rem]">
                    <label className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
                      Số thẻ
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      placeholder="AAA"
                      className="bg-transparent border-[0.1rem] border-[var(--border-secondary)] rounded-[1.2rem] h-[4.8rem] px-[1.6rem] text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)]"
                    />
                  </div>

                  {/* Expiry Date & CVV */}
                  <div className="flex gap-[1.6rem]">
                    {/* Expiry Date */}
                    <div className="flex flex-col gap-[1.2rem] flex-1">
                      <label className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
                        Thời gian hết hạn
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={e => {
                            const input = e.target.value;

                            // Remove all non-numeric characters
                            const numericOnly = input.replace(/\D/g, '');

                            // Validate first digit (only 0 or 1)
                            if (numericOnly.length >= 1) {
                              const firstDigit = parseInt(numericOnly[0]);
                              if (firstDigit > 1) {
                                return; // Block if first digit > 1
                              }
                            }

                            // Validate month (MM)
                            if (numericOnly.length >= 2) {
                              const month = parseInt(numericOnly.slice(0, 2));
                              if (month < 1 || month > 12) {
                                return; // Block invalid month
                              }
                            }

                            // Limit to 4 digits (MMYY)
                            const limited = numericOnly.slice(0, 4);

                            // Auto-format: add "/" after 2 digits
                            let formatted = limited;
                            if (limited.length >= 3) {
                              formatted =
                                limited.slice(0, 2) + '/' + limited.slice(2);
                            }

                            setExpiryDate(formatted);
                          }}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="bg-transparent border-[0.1rem] border-[var(--border-secondary)] rounded-[1.2rem] h-[4.8rem] px-[1.6rem] pr-[4.8rem] w-full text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)]"
                        />
                        <div className="absolute right-[1.6rem] top-1/2 -translate-y-1/2">
                          <CalendarIcon />
                        </div>
                      </div>
                    </div>

                    {/* CVV */}
                    <div className="flex flex-col gap-[1.2rem] flex-1">
                      <label className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)]">
                        Mã CCV
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cvv}
                          onChange={e => {
                            const input = e.target.value;

                            // Remove all non-numeric characters
                            const numericOnly = input.replace(/\D/g, '');

                            // Limit to 3 digits
                            const limited = numericOnly.slice(0, 3);

                            setCvv(limited);
                          }}
                          placeholder="Mã CCV"
                          maxLength={3}
                          className="bg-transparent border-[0.1rem] border-[var(--border-secondary)] rounded-[1.2rem] h-[4.8rem] px-[1.6rem] pr-[4.8rem] w-full text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-primary)] focus:outline-none focus:border-[var(--border-active)]"
                        />
                        <div className="absolute right-[1.6rem] top-1/2 -translate-y-1/2">
                          <HelpIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-[0.5rem]">
          <p className="text-[1.6rem] font-[500] leading-[1.4] text-[var(--text-primary)]">
            Thành tiền:
          </p>
          <p className="text-[2.4rem] font-[600] leading-[1.2] bg-gradient-to-b from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] bg-clip-text text-transparent">
            {totalAmount} VNĐ
          </p>
        </div>

        <div className="flex flex-col items-end gap-[0.8rem]">
          <Button
            onPress={() => {
              // Handle payment
              console.log('Payment method:', paymentMethod);
              console.log('Selected bank:', selectedBank);
            }}
            className="bg-gradient-to-b from-[var(--brand-gradient-start)] to-[var(--brand-gradient-end)] rounded-[1.6rem] h-[4.8rem] w-[21.1rem] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)] p-[1rem]"
          >
            <span className="text-[1.6rem] font-[600] leading-[1.4] text-[var(--text-primary)]">
              Mua
            </span>
          </Button>
          <p className="text-[1.5rem] font-[400] leading-[1.4] text-[var(--text-tertiary)] text-right w-[68.7rem]">
            Nhấn "<span className="text-[var(--text-primary)]">Mua</span>" đồng
            nghĩa với việc bạn đồng ý tuân theo{' '}
            <span className="text-[var(--text-primary)] underline">
              Điều kiện
            </span>{' '}
            và{' '}
            <span className="text-[var(--text-primary)] underline">
              Điều khoản
            </span>{' '}
            của Wisetrade
          </p>
        </div>
      </div>
    </div>
  );
}
