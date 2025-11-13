import { METHOD } from 'global';
import { AUTH_FORGOT_RESULT } from 'global/swr';

import { useMutation } from 'hooks/swr';

export const useResetPassword = () => useMutation<unknown>('/api/v1/resetPassword', {
    url: '/api/v1/resetPassword',
    method: METHOD.POST,
    loading: true,
    resultKey: AUTH_FORGOT_RESULT,
  });
