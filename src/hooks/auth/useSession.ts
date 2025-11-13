import { useMemo } from 'react';

import useSWR from 'swr';
import jwt from 'jsonwebtoken';
import Cookies from 'js-cookie';
import {
  type Obj,
  type Token,
  USER_LEVEL,
  type UserInfo,
  type RestError,
  type SessionInfo,
  type RestResponse,
  type LoginResponse,
} from 'interfaces';

import { SESSION_INFO } from 'global/swr';
import { METHOD, MEDIA_TYPE } from 'global';
import { Global } from 'global/client-only';
import { ACCOUNT_LIST } from 'global/localStorage';

import { fetcher } from 'utils/restApi';
import { getAccounts } from 'utils/account';
import { getKey, setKey, removeKey } from 'utils/localStorage';

import { useSocketInit } from 'hooks/market';
import { useAccount } from 'hooks/account/useAccount';

const requestLogout = async (params?: Record<string, unknown>) => {
  return fetcher('/api/v1/logout', METHOD.POST, params);
};

const logoutCustomerDevice = async () => {
  return fetcher('/api/v1/partner/customer/device', METHOD.DELETE);
};

const getUserInfo = (token?: string) =>
  fetcher('/api/v1/user/info', METHOD.GET, undefined, {
    ...(token && { Authorization: `Bearer ${token}` }),
  });

const checkSMS = (token?: string, accountNumber?: string) =>
  fetcher(
    '/api/v1/equity/account/sms',
    METHOD.GET,
    {
      accountNumber,
    },
    {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  );

export const useSession = () => {
  const { data: session, mutate } = useSWR<SessionInfo>(SESSION_INFO);
  const { data: socketInit } = useSocketInit();

  const { changeAccount, changeAccountList } = useAccount();

  const initUser = async ({ token }: { token?: string }) => {
    mutate(prev => ({ ...prev, loading: true }));
    if (!token) {
      mutate({ isAuthenticated: false, loading: false });
      return false;
    }
    try {
      const userInfo = (await getUserInfo(token)) as UserInfo;
      Global.userSettings = userInfo.userSettings || {};

      const tokenInfo = jwt.decode(token) as Token;
      userInfo.accountNumber = tokenInfo.ud?.ex?.acc?.[0]?.accountNumber;
      userInfo.userLevel = tokenInfo.ud?.ex?.lvl;
      Global.userLevel = tokenInfo.ud?.ex?.lvl;

      try {
        if (userInfo.accountNumber) {
          const checkHasSms = await checkSMS(token, userInfo.accountNumber);
          if (checkHasSms?.smsYn) {
            userInfo.useSmsOtp = checkHasSms.smsYn;
          }
        }
      } catch (error) {
        console.log('error check sms', error);
      }
      userInfo.otp = tokenInfo.otp;

      if (userInfo.userLevel === USER_LEVEL.CUSTOMER) {
        const accountList = getKey(`${ACCOUNT_LIST}_${userInfo.id}`);
        const accounts = getAccounts((accountList as unknown as Obj[]) || [], true);
        changeAccountList(accounts);
        const defaultAccount = accounts.find(
          item => item.subNumber === userInfo.userSettings?.selectedAccount,
        );
        changeAccount(defaultAccount || accounts[0]);
      }

      mutate({
        isAuthenticated: true,
        loading: false,
        accessToken: token,
        userInfo,
      });
      return true;
    } catch (error) {
      mutate({ isAuthenticated: false, loading: false });
      return false;
    }
  };

  const login = async (payload: {
    username: string;
    password: string;
  }): Promise<RestError | RestResponse<LoginResponse>> => {
    const uri = '/api/v1/login';
    const data = {
      username: payload.username,
      password: payload.password,
      grant_type: process.env.NEXT_PUBLIC_GRANT_TYPE,
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    };
    const result = await fetcher<LoginResponse>(uri, METHOD.POST, data, {
      mediatype: MEDIA_TYPE.WEB,
    });
    const accountList = result.accountList;

    setKey(`${ACCOUNT_LIST}_${result.userId}`, accountList);
    const init = await initUser({ token: result.accessToken });
    Cookies.set('auth', result.accessToken);
    Cookies.set('refresh_token', result.refreshToken);
    if (!init) {
      return {
        code: 'UNAUTHORIZE',
      };
    }
    return result;
  };

  const logout = async () => {
    try {
      delete Global.userSettings;
      delete Global.systemType;
      delete Global.userLevel;
      const refresh_token = Cookies.get('refresh_token');
      requestLogout({
        refresh_token,
      });
    } catch (error) {
      console.log(error);
    }
    Cookies.set('auth', '');
    Cookies.set('refresh_token', '');
    removeKey(`${ACCOUNT_LIST}_${session?.userInfo?.id}`);
    changeAccountList([]);
    if (socketInit && Global.socket?.authState === Global.socket?.AUTHENTICATED) {
      Global.socket?.deauthenticate();
    }
    mutate({
      isAuthenticated: false,
    });
  };

  const setToken = (token: string) => {
    mutate(prev => ({ ...prev, accessToken: token }));
    Cookies.set('auth', token);
  };

  const isViewMode = useMemo(() => {
    if (!session?.accessToken) {
      return false;
    }

    const tokenInfo = jwt.decode(session?.accessToken) as Token;
    const userLevel = tokenInfo.ud?.ex?.lvl;
    if (userLevel && userLevel === USER_LEVEL.USER) {
      return false;
    }

    return !tokenInfo?.otp?.exp || tokenInfo.otp?.exp <= new Date().getTime() / 1000;
  }, [session]);

  return {
    initUser,
    logout,
    login,
    session,
    isViewMode,
    setToken,
  };
};
