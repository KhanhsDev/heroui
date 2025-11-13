'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

import SearchIcon from '@/assets/svg/SearchIcon';
import BellIcon from '@/assets/svg/BellIcon';
import Profile from '@/components/Profile';
import { ThemeSwitch } from '../theme-switch';
import ShoppingCartIcon from '@/assets/svg/ShoppingCart';
import ShoppingCart from '../ShoppingCart';

export default function Header() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);
  const handleLogout = () => {
    setIsProfileOpen(false);
    // TODO: Xử lý logout logic
    console.log('User logged out');
  };

  return (
    <header className="flex h-[6.8rem] items-center border-b-[0.1rem] border-[var(--border-primary)] bg-[var(--bg-primary)] px-[2.4rem]">
      {/* ========== SEARCH BAR SECTION ========== */}
      <div className="flex h-[4.4rem] w-[36.5rem] items-center gap-[1rem] rounded-[1.6rem] border border-[var(--border-primary)] bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313] px-[1.2rem]">
        <SearchIcon />
        <input
          className="flex-1 bg-transparent text-[var(--text-primary)] outline-none placeholder:text-[var(--text-primary)]"
          placeholder="Tìm kiếm"
          style={{ fontSize: '1.6rem', lineHeight: '1.4' }}
          type="text"
        />
      </div>

      {/* ========== SPACER ========== */}
      <div className="flex-1" />

      {/* ========== ACTION BUTTONS SECTION ========== */}
      <div className="flex items-center gap-[1.6rem]">
        {/* Theme Toggle Button */}
        <button className="cursor-pointer flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-[1.6rem] bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313]">
          <ThemeSwitch />
        </button>
        <button
          className="cursor-pointer flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-[1.6rem] bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313]"
          onClick={() => {
            setIsShowCart(true);
          }}
        >
          <ShoppingCartIcon className="text-[#FFFFFF] size-[2rem]" />
        </button>
        {/* Notification Button */}
        <div className="relative">
          <button className="cursor-pointer flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-[1.6rem] bg-gradient-to-r from-[#111313] via-[#222622] to-[#111313]">
            <BellIcon />
          </button>
          {/* Notification Badge */}
          <div className="absolute right-0 top-0 flex h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-[3.5rem] bg-[#ff2f2f] px-[0.4rem]">
            <span
              className="text-[var(--text-secondary)]"
              style={{ fontSize: '1rem', fontWeight: 700, lineHeight: '1.4' }}
            >
              2
            </span>
          </div>
        </div>

        {/* Profile Avatar */}
        <div
          className="cursor-pointer relative h-[4.4rem] w-[4.4rem] overflow-hidden rounded-[1.6rem]"
          onClick={() => setIsProfileOpen(true)}
        >
          <Image
            alt="User Profile"
            className="object-cover"
            fill
            src="/assets/png/profile-avatar.png"
          />
        </div>
      </div>

      {/* Profile Modal - Full Screen */}
      <AnimatePresence>
        {isShowCart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex"
          >
            <div
              className="flex-1 bg-black/50"
              onClick={() => setIsShowCart(false)}
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-[100rem] h-full bg-[var(--bg-secondary)] overflow-y-auto"
            >
              <ShoppingCart />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex"
          >
            {/* Overlay - Click to close */}
            <div
              className="flex-1 bg-black/50"
              onClick={() => setIsProfileOpen(false)}
            />

            {/* Profile Panel - Right Side */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="w-[35rem] h-full bg-[var(--bg-secondary)] overflow-y-auto"
            >
              <Profile onLogout={handleLogout} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
