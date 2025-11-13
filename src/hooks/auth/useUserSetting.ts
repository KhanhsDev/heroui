import type { UserSettings } from 'interfaces';

import { METHOD } from 'global';
import { Global } from 'global/client-only';

import { useMutation } from 'hooks/swr';
import { useDebounceCallBack } from 'hooks/common';

import { useSession } from './useSession';

export const useUserSettings = () => {
  const { session } = useSession();
  const { trigger } = useMutation('/api/v1/user/settings', {
    url: '/api/v1/user/settings',
    method: METHOD.PUT,
  });

  const updateSettings = useDebounceCallBack((settings: Partial<UserSettings>) => {
    if (!session?.isAuthenticated) return;
    Global.userSettings = {
      ...Global.userSettings,
      ...settings,
    };
    trigger({
      ...Global.userSettings,
      ...settings,
    });
  }, 500);

  return { updateSettings };
};
