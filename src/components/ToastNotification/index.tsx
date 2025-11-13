'use client';

import './style.scss';

import React from 'react';

import { useTranslation } from 'app/i18n/client';
import XLinnerIcon from 'assets/svg/x-bg-linner.svg';
import WaringIcon from 'assets/svg/notice-warning.svg';
import TickLinnerIcon from 'assets/svg/tick-linner.svg';

interface ToastNotificationProps {
  title?: string | null;
  content?: string | React.ReactNode;
  type: 'success' | 'error' | 'warning';
}

const MapIcon = {
  success: <TickLinnerIcon className="h-[4rem] w-[4rem]" />,
  warning: <WaringIcon className="h-[4rem] w-[4rem]" />,
  error: <XLinnerIcon className="h-[4rem] w-[3.2rem]" />,
};

const MapColor = {
  success: '--green-night',
  warning: '--yellow-night',
  error: '--red-night',
};

const ToastNotification = (props: ToastNotificationProps) => {
  const { t } = useTranslation();
  const { type, title, content } = props;

  return (
    <div className="flex gap-[1.6rem] items-center px-[1.6rem] py-[1.2rem] border-[--border-16] border rounded-[0.8rem] bg-[--bg-01-night]">
      <div>{MapIcon[type]}</div>
      <div className="flex flex-col h-full gap-[0.4rem]">
        <div
          className="text-[1.6rem] leading-[2rem] font-[500]"
          style={{
            color: `var(${MapColor[type]})`,
          }}
        >
          {title ? t(title) : ''}
        </div>
        <div className="text-[1.2rem] leading-[1.4rem] font-[500] text-[--text-5] text-ellipsis whitespace-pre-line">
          {typeof content === 'string' ? (
            <p dangerouslySetInnerHTML={{ __html: t(content) || '' }} />
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
};

export default ToastNotification;
