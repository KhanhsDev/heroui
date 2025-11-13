import useSWR from 'swr';

import type { NotificationConfig } from 'interfaces';

import { GLOBAL_VERIFY_OTP_STATE } from 'global/swr';

export interface VerifyOTPState<T = Record<string, unknown>> {
  visible: boolean;
  uri?: string;
  payload?: T | (() => T);
  notification?: NotificationConfig;
  isMulti?: boolean;
  execAll?: boolean;
  callback?(componentId?: string): void;
  onSuccess?(data?: any): void;
  onError?(data?: any): void;
  mandatoryVerify?: boolean;
  numInputs?: number;
  type?: string;
}

export const useOtpModal = <T = Record<string, unknown>>() => {
  const swrResponse = useSWR<VerifyOTPState<T>>(GLOBAL_VERIFY_OTP_STATE);

  const openModal = (state: VerifyOTPState<T>) => {
    swrResponse.mutate({ ...state, visible: true });
  };

  const closeModal = () => {
    swrResponse.mutate({ visible: false });
  };

  return {
    openModal,
    closeModal,
    verifyOTPState: swrResponse.data,
  };
};
