'use client';

import { Modal, ModalContent, ModalBody } from '@heroui/modal';
import { Button } from '@heroui/button';
import CheckIconLarge from '@/assets/svg/CheckIconLarge';

interface StopSignalWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StopSignalWarningModal({
  isOpen,
  onClose,
  onConfirm,
}: StopSignalWarningModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      hideCloseButton
      classNames={{
        base: 'rounded-[2rem]',
        backdrop: 'bg-black/80',
      }}
      style={{
        background: 'var(--bg-gradient-modal)',
      }}
    >
      <ModalContent className="max-w-[41rem]">
        <ModalBody className="p-[2.4rem] flex flex-col gap-[1.6rem] items-center">
          {/* Success Icon with Gradient Border */}
          <div className="border-[1rem] border-[var(--bg-success-alpha)] rounded-full">
            <div className="rounded-full h-[4.8rem] w-[4.8rem] relative flex items-center justify-center bg-gradient-to-b from-[var(--bg-success-gradient-start)] to-[var(--bg-success-gradient-end)]">
              <CheckIconLarge />
            </div>
          </div>

          {/* Title */}
          <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-secondary)] text-center w-full">
            Xác nhận dừng tín hiệu
          </p>

          {/* Warning Box */}
          <div className="w-full bg-[var(--bg-warning-alpha)] rounded-[0.8rem] p-[0.8rem] flex gap-[0.4rem] items-start">
            {/* Warning Icon */}
            <div className="shrink-0 size-[2rem]">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z"
                  stroke="var(--icon-warning)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Warning Text */}
            <p className="flex-1 text-[1.4rem] font-[400] leading-[1.3] text-[var(--text-primary)]">
              <span className="font-[500] italic text-[var(--text-warning)]">
                Lưu ý:{' '}
              </span>
              <span className="italic">
                Trong danh sách mã bạn chọn có mã đang ở trạng thái Chưa áp
                dụng.{' '}
              </span>
              <span className="italic">
                Hệ thống chỉ dừng tín hiệu cho các mã có trạng thái Đang áp dụng
              </span>
            </p>
          </div>

          {/* Description */}
          <p className="text-[1.4rem] font-[400] leading-[1.3] text-[var(--text-tertiary)] text-center w-full mb-[1.6rem]">
            Bạn có chắc chắn muốn dừng tín hiệu mua/bán không? Sau khi dừng, hệ
            thống sẽ ngừng gửi tín hiệu, vì vậy lệnh tự động sẽ không được thực
            hiện.
          </p>

          {/* Buttons */}
          <div className="flex gap-[1.6rem] w-full">
            <Button
              onPress={onClose}
              className="flex-1 h-[4rem] bg-[var(--bg-secondary)] border border-[var(--border-secondary)] rounded-[1.2rem] text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-primary)]"
            >
              Huỷ
            </Button>
            <Button
              onPress={onConfirm}
              className="flex-1 h-[4rem] rounded-[1.2rem] text-[1.5rem] font-[600] leading-[1.4] text-[var(--text-primary)] shadow-[0px_2px_8.3px_0px_rgba(14,175,116,0.2)]"
              style={{
                background: 'var(--bg-gradient-confirm-btn)',
              }}
            >
              Xác nhận
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
