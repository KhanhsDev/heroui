'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Link } from '@heroui/link';

import PhoneIcon from '@/svg/PhoneIcon';
import MailIcon from '@/svg/MailIcon';
import MapPinIcon from '@/svg/MapPinIcon';
import ChevronDownIcon from '@/svg/ChevronDownIcon';
import CopyrightIcon from '@/svg/CopyrightIcon';

export default function Footer() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <footer className="relative bg-[var(--bg-secondary)]">
      {/* ========== COLLAPSED VIEW (DEFAULT) ========== */}
      <div className="flex h-[6.8rem] items-center px-[2.4rem]">
        <div className="flex-1" />

        {/* Contact Section */}
        <div className="flex items-center gap-[2.4rem]">
          <p
            className="text-[var(--text-primary)]"
            style={{ fontSize: '1.6rem', fontWeight: 500, lineHeight: '1.4' }}
          >
            Liên hệ
          </p>

          {/* Phone */}
          <div className="flex items-center gap-[0.8rem]">
            <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-[1.6rem] bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313]">
              <PhoneIcon />
            </div>
            <p
              className="text-[var(--text-tertiary)]"
              style={{
                fontSize: '1.6rem',
                fontWeight: 400,
                lineHeight: '1.4',
              }}
            >
              0392672182
            </p>
          </div>

          {/* Email */}
          <div className="flex items-center gap-[0.8rem]">
            <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-[1.6rem] bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313]">
              <MailIcon />
            </div>
            <p
              className="text-[var(--text-tertiary)]"
              style={{
                fontSize: '1.6rem',
                fontWeight: 400,
                lineHeight: '1.4',
              }}
            >
              buivankhanh2k4@gmail.com
            </p>
          </div>

          {/* Address */}
          <div className="flex items-center gap-[0.8rem]">
            <div className="flex h-[4rem] w-[4rem] items-center justify-center rounded-[1.6rem] bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313]">
              <MapPinIcon />
            </div>
            <p
              className="text-[var(--text-tertiary)]"
              style={{
                fontSize: '1.6rem',
                fontWeight: 400,
                lineHeight: '1.4',
              }}
            >
              Khối 21, phường Hoàng Mai, tỉnh Nghệ An
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
