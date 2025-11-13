'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/button';
import { Link } from '@heroui/link';

import { Modal, ModalContent, useDisclosure } from '@heroui/modal';

import HomeIcon from '@/assets/svg/HomeIcon';
import ShoppingBagIcon from '@/assets/svg/ShoppingBagIcon';
import CommandIcon from '@/assets/svg/CommandIcon';
import Extend from '@/assets/svg/Extend';
import ChevronRightIcon from '@/assets/svg/ChevronRightIcon';
import Subscription from '../Subscription';
import Payment from '../Payment';
import UpdatePackage from '../UpdatePackage';

export default function Sidebar() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const {
    isOpen: isSubscriptionOpen,
    onOpen: onSubscriptionOpen,
    onClose: onSubscriptionClose,
  } = useDisclosure();
  const {
    isOpen: isPaymentOpen,
    onOpen: onPaymentOpen,
    onClose: onPaymentClose,
  } = useDisclosure();

  // Selected plan info
  const [selectedPlan, setSelectedPlan] = useState<{
    planName: string;
    billingCycle: string;
    totalAmount: string;
  } | null>(null);

  const handleBuyPlan = (
    planName: string,
    billingCycle: string,
    totalAmount: string,
  ) => {
    setSelectedPlan({ planName, billingCycle, totalAmount });
    onSubscriptionClose();
    onPaymentOpen();
  };

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: HomeIcon, href: '/home' },
    {
      id: 'watchlist',
      label: 'Danh sách theo dõi',
      icon: ShoppingBagIcon,
      href: '/watchlist',
    },
    { id: 'backtest', label: 'Backtest', icon: CommandIcon, href: '/backtest' },
  ];

  // Set active nav based on current pathname
  useEffect(() => {
    const currentNav = navItems.find(item => pathname === item.href);
    if (currentNav) {
      setActiveNav(currentNav.id);
    }
  }, [pathname]);

  return (
    <>
      {/* ========== LOGO SECTION ========== */}
      <div className="flex items-center h-[6.4rem] w-full shadow-[0px_1px_4px_0px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="flex items-center w-fit">
          <div className="relative h-[5.2rem] w-[5.2rem] flex-shrink-0">
            <Image
              alt="WiseTrade Logo"
              className="object-contain"
              fill
              priority
              src="/assets/png/logo-wisetrade.png"
            />
          </div>
          <span className="text-[#55b657]">Khanhs</span>
          <span className="text-[var(--text-primary)]">Dev</span>
          <nav className="flex gap-[2.4rem] px-[1.6rem] h-[5rem] w-full justify-end">
            {navItems.map(item => {
              const isActive = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-[1.2rem] rounded-[1.2rem] px-[1.2rem] py-[1rem] text-[1.6rem] font-[500] leading-[1.4] transition-colors duration-200 ${
                    isActive
                      ? 'bg-[var(--bg-secondary)] text-[var(--text-accent)]'
                      : 'text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-accent)]'
                  }`}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ========== EXPAND/COLLAPSE BUTTON ========== */}
      <Button
        isIconOnly
        className="absolute bottom-[1.6rem] right-[-1.8rem] w-[3.6rem] h-[3.6rem] min-w-[3.6rem] rounded-full bg-[var(--border-secondary)] p-0"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          <ChevronRightIcon />
        </motion.div>
      </Button>

      {/* Subscription Modal */}
      <Modal
        isOpen={isSubscriptionOpen}
        onClose={onSubscriptionClose}
        hideCloseButton
        classNames={{
          base: 'max-w-[162rem]',
          wrapper: 'items-center justify-center',
        }}
      >
        <ModalContent>
          {onClose => (
            <Subscription onClose={onClose} onBuyPlan={handleBuyPlan} />
          )}
        </ModalContent>
      </Modal>

      {/* Payment Modal */}
      <Modal
        isOpen={isPaymentOpen}
        onClose={onPaymentClose}
        hideCloseButton
        classNames={{
          base: 'max-w-[162rem]',
          wrapper: 'items-center justify-center',
        }}
      >
        <ModalContent>
          {onClose => (
            <Payment
              onClose={onClose}
              planName={selectedPlan?.planName}
              billingCycle={selectedPlan?.billingCycle}
              totalAmount={selectedPlan?.totalAmount}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
