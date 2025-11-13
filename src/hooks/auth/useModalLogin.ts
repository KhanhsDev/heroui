import useSWR from 'swr';

import { COMMON_LOGIN_MODAL } from 'global/swr';

export const useModalLogin = () => {
  const { data, mutate } = useSWR<{ show: boolean; redirectTo?: string }>(COMMON_LOGIN_MODAL);

  return {
    show: data?.show,
    redirectTo: data?.redirectTo,
    handleHide: () => {
      mutate({ show: false });
    },
    handleShow: (redirectTo?: string) => {
      mutate({ show: true, redirectTo });
    },
  };
};
