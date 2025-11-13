import { toast } from 'react-toastify';

import { useTranslation } from 'app/i18n/client';

import type { RestError, NotificationConfig } from 'interfaces';

import { METHOD, OTP_WRONG_CODES } from 'global';

import { uuid } from 'utils/common';
import { getRequestErrorMessage } from 'utils/restApi';

import { useMutation } from 'hooks/swr';

import ToastNotification from 'components/ToastNotification';

import { useSession } from './useSession';

interface OTPResponse {
  accessToken: string;
  refreshToken: string;
}

export const useOTP = () => {
  const genOTPMutation = useMutation<{ otpIndex: string; transactionId: string }>('/api/v1/genMatrixOtp', {
    url: '/api/v1/genMatrixOtp',
    method: METHOD.POST,
    loading: true,
  });

  const verifyOTPMutation = useMutation<OTPResponse & Record<string, unknown>>('/api/v1/verifyOTP', {
    url: '/api/v1/verifyOTP',
    method: METHOD.POST,
    loading: true,
  });

  const { setToken } = useSession();
  const { t } = useTranslation();

  const handleVerifyOTP = async (payload: Record<string, unknown>) => {
    const notification = payload.notification as NotificationConfig;
    delete payload.notification;
    try {
      const data = await verifyOTPMutation.trigger(payload);
      setToken(data.accessToken);
      console.log({ data });

      if (data?.status && data?.status?.code) {
        throw data?.status;
      }
      if (notification && !notification.ignoreSuccess) {
        let message = t(notification.content as string, {
          ...(data as Record<string, string>),
        });
        let title = notification.title;
        let type: 'success' | 'error' | 'warning' = 'success';
        if (notification.getSuccessNoti) {
          const noti = notification.getSuccessNoti(data);
          type = noti.type;
          message = noti.content;
          title = noti.title;
        } else if (Array.isArray(data.result)) {
          const total = data.result.length;
          const success = data.result.filter(data => data.success || data.code === '200').length;
          message = t(notification.content!, { success, total });
          if (success < total) type = 'warning';
          if (success === 0) {
            type = 'error';
            title = notification.titleError ?? notification.title;
            message = notification.errorMessage ?? data.result[0]?.message ?? message;
          }
        }
        toast(<ToastNotification type={type} title={title} content={message} />, {
          toastId: uuid(),
          position: 'top-right',
          hideProgressBar: true,
          theme: 'light',
          containerId: notification.containerId,
        });
      }
      return {
        success: true,
        result: data,
      };
    } catch (err) {
      const error = err as RestError;
      if (!OTP_WRONG_CODES.includes(error?.code as string) && notification && !notification.ignoreError) {
        toast(
          <ToastNotification
            type="error"
            title={notification?.titleError ?? notification.title}
            content={
              (getRequestErrorMessage(error, t) || notification?.errorMessage) ?? error.message ?? error.code
            }
          />,
          {
            toastId: uuid(),
            position: 'top-right',
            hideProgressBar: true,
            theme: 'light',
            containerId: notification.containerId,
          },
        );
      }
      return {
        success: false,
        error,
      };
    }
  };

  return {
    genOTPMutation,
    verifyOTPMutation,
    handleVerifyOTP,
  };
};
