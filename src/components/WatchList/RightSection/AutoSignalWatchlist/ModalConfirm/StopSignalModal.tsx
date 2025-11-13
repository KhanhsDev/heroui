"use client";

import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";
import CheckIconLarge from "@/svg/CheckIconLarge";

interface StopSignalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function StopSignalModal({
  isOpen,
  onClose,
  onConfirm,
}: StopSignalModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="center"
      hideCloseButton
      classNames={{
        base: "rounded-[2rem]",
        backdrop: "bg-black/80",
      }}
      style={{
        background: "var(--bg-gradient-modal)",
      }}
    >
      <ModalContent className="max-w-[38.9rem]">
        <ModalBody className="p-[2.4rem] flex flex-col gap-[1.6rem] items-center">
          {/* Success Icon with Gradient Border */}
          <div className="border-[1.6rem] border-[var(--bg-success-alpha)] rounded-full">
            <div className="rounded-full h-[4.8rem] w-[4.8rem] relative flex items-center justify-center bg-gradient-to-b from-[var(--bg-success-gradient-start)] to-[var(--bg-success-gradient-end)]">
              <CheckIconLarge />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-[0.8rem] items-center text-center w-full">
            {/* Title */}
            <p className="text-[1.8rem] font-[600] leading-[1.2] text-[var(--text-secondary)] w-full">
              Xác nhận dừng tín hiệu
            </p>

            {/* Description */}
            <p className="text-[1.4rem] font-[400] leading-[1.3] text-[var(--text-tertiary)] w-full">
              Bạn có chắc chắn muốn dừng tín hiệu mua/bán không? Sau khi dừng,
              hệ thống sẽ ngừng gửi tín hiệu, vì vậy lệnh tự động sẽ không được
              thực hiện.
            </p>
          </div>

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
                background: "var(--bg-gradient-confirm-btn)",
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
