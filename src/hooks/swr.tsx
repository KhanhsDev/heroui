import { toast } from 'react-toastify';

import useSWRMutation from 'swr/mutation';
import useSWR, { useSWRConfig } from 'swr';
import { useTranslation } from 'app/i18n/client';

import type { PublicConfiguration } from 'swr/_internal';
import type { SWRMutationConfiguration } from 'swr/mutation';
import type { RestError, RestResponse, NotificationConfig } from 'interfaces';

import { COMMON_LOADING } from 'global/swrKey';
import { METHOD } from 'global/common';

import { uuid, isBlank } from 'utils/common';
import { fetcher, getRequestErrorMessage } from 'utils/restApi';

import ToastNotification from 'components/ToastNotification';

import { useSession } from './auth/useSession';

export function useSWRWrapper<T = Record<string, unknown>>(
  key: string | null | (() => string | string[] | null) | string[],
  {
    url,
    ignoreKeyParse,
    method,
    body,
    auth,
    noEndPoint,
    enable = true,
    ...config
  }: {
    url?: string;
    method?: METHOD;
    body?: Record<string, unknown>;
    auth?: boolean;
    enable?: boolean;
    noEndPoint?: boolean;
    extraHeader?: Record<string, string>;
    ignoreKeyParse?: boolean;
  } & Partial<PublicConfiguration<T, RestError, (arg: string) => any>> = {},
) {
  const { session } = useSession();
  const { onError: globalError } = useSWRConfig();

  auth = auth ?? true;

  return useSWR<T>(
    enable ? (key ?? '') : null,
    () => {
      const extraHeader = (body as Record<string, unknown>)
        ?.extraHeader as Record<string, string>;
      if (!(body instanceof FormData) && body?.extraHeader) {
        delete body.extraHeader;
      }

      const header = {
        ...(auth &&
          !isBlank(session?.accessToken) && {
            Authorization: `Bearer ${session?.accessToken}`,
          }),
        ...extraHeader,
        ...config?.extraHeader,
      };
      return new Promise((resolve, reject) => {
        fetcher<T>(
          url ?? (typeof key === 'string' ? key : ''),
          method ?? METHOD.GET,
          body,
          header,
          noEndPoint,
        )
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            console.log('reject', err);
            reject(err as Error);
          });
      });
    },
    {
      ...config,
      onError(err, swrKey) {
        console.log('SWR onError', err, swrKey);
        config?.onError?.(err, swrKey, config as any);
        globalError(err, swrKey, config as any);
      },
    },
  );
}

export const useMutation = <T = Record<string, unknown>,>(
  key: string,
  {
    url,
    method,
    noEndpoint,
    resultKey,
    ...options
  }: {
    url?: string;
    method?: METHOD;
    notification?: NotificationConfig;
    componentId?: string;
    loading?: boolean;
    noEndpoint?: boolean;
    noAuth?: boolean;
    extraHeader?: Record<string, string>;
    resultKey?: string;
  } & SWRMutationConfiguration<
    RestResponse<T>,
    RestError & Record<string, unknown>
  >,
) => {
  const { t } = useTranslation();
  const { mutate, onError: globalError } = useSWRConfig();
  const { session } = useSession();

  return useSWRMutation(
    key,
    (
      swrKey: string,
      { arg: body, ...rest }: { arg?: Record<string, unknown> | FormData },
      ...rest2
    ) =>
      new Promise<RestResponse<T>>((resolve, reject) => {
        let componentId = options.componentId;
        let notification = options.notification;
        if (!(body instanceof FormData) && body?.componentId) {
          componentId = body?.componentId as string;
          delete body.componentId;
        }
        if (!(body instanceof FormData) && body?.notification) {
          notification = body?.notification as NotificationConfig;
          delete body.notification;
        }
        if (!(body instanceof FormData) && body?.componentId) {
          componentId = body?.componentId as string;
          delete body.componentId;
        }
        if (options.loading) {
          mutate(COMMON_LOADING, {
            componentId,
            loading: true,
          });
        }

        const extraHeader = (body as Record<string, unknown>)
          ?.extraHeader as Record<string, string>;
        if (!(body instanceof FormData) && body?.extraHeader) {
          delete body.extraHeader;
        }

        fetcher<T>(
          url ?? swrKey,
          method ?? METHOD.POST,
          body as Record<string, unknown>,
          options.noAuth
            ? undefined
            : {
                ...(session?.accessToken && {
                  Authorization: `Bearer ${session?.accessToken}`,
                }),
                ...extraHeader,
                ...options?.extraHeader,
              },
          noEndpoint,
        )
          .then(data => {
            resolve(data);
            if (resultKey) {
              mutate(resultKey, {
                success: true,
                response: data,
                request: body,
              });
            }
            if (notification && !notification.ignoreSuccess) {
              let message = t(notification.content as string, {
                ...(data as Record<string, string>),
                ...body,
              });
              let title = notification.title;
              let type: 'success' | 'error' | 'warning' = 'success';
              if (notification.getSuccessNoti) {
                const noti = notification.getSuccessNoti(data);
                type = noti.type;
                message = noti.content;
                title = noti.title;
              } else if (Array.isArray(data) && !notification.ignoreCount) {
                const total = data.length;
                const success = data.filter(item => item.success).length;
                message = t(notification.content!, { success, total });
                if (success < total) {
                  type = 'warning';
                }
                if (success === 0) {
                  type = 'error';
                  if (notification.titleError) title = notification.titleError;
                  message = notification.errorMessage ?? notification.content!;
                } else {
                  if (notification.titleSuccess)
                    title = notification.titleSuccess;
                }
              }
              toast(
                <ToastNotification
                  type={type}
                  title={title}
                  content={message}
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
          })
          .catch(err => {
            reject(err as Error);
            if (resultKey) {
              mutate(resultKey, {
                success: false,
              });
            }
            if (notification && !notification.ignoreError) {
              toast(
                <ToastNotification
                  type="error"
                  title={notification.title}
                  content={
                    (getRequestErrorMessage(err, t) ||
                      notification?.errorMessage) ??
                    err.message ??
                    err.code
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
          })
          .finally(() => {
            if (options.loading) {
              mutate(COMMON_LOADING, {
                componentId,
                loading: false,
              });
            }
          });
      }),
    {
      onError(err, swrKey, config) {
        options.onError?.(err, swrKey, config as any);
        globalError(err, swrKey, config as any);
      },
      onSuccess(data, swrKey, config) {
        options.onSuccess?.(data, swrKey, config as any);
      },
    },
  );
};

type SWRMultiResult<T> =
  | { status: 'fulfilled'; value: T }
  | { status: 'rejected'; reason: any };

type useSWRMultiOptions<T> = {
  useAllSettled?: boolean;
  extraHeader?: Record<string, string>;
} & Partial<
  PublicConfiguration<SWRMultiResult<T>[], RestError, (arg: string) => any>
>;

export const useSWRMulti = <T = Record<string, unknown>,>(
  key?: string[] | (() => string[]) | null,
  { useAllSettled, ...config }: useSWRMultiOptions<T> = {
    useAllSettled: false,
  },
) => {
  const { session } = useSession();

  const headers = {
    Authorization: `Bearer ${session?.accessToken}`,
    ...config?.extraHeader,
  };
  console.log(Array.isArray(key) ? key?.join(',') || null : key);

  return useSWR<SWRMultiResult<T>[]>(
    Array.isArray(key) ? key?.join(',') || null : key,
    async () => {
      let urls: (string | null)[] = [];

      if (typeof key === 'function') {
        const dynamicKey = key();
        if (Array.isArray(dynamicKey))
          urls = dynamicKey.filter(k => !isBlank(k!));
        if (typeof dynamicKey === 'string' && !isBlank(dynamicKey))
          urls = [dynamicKey];
      }
      if (Array.isArray(key)) {
        urls = key.filter(k => !isBlank(k!));
      }

      const fetchPromises = urls.map(url =>
        fetcher<T>(url!, METHOD.GET, undefined, headers),
      );

      if (useAllSettled) {
        return await Promise.allSettled(fetchPromises);
      } else {
        return (await Promise.all(fetchPromises)
          .then(results =>
            results.map(value => ({ status: 'fulfilled', value }) as const),
          )
          .catch(reason => [
            { status: 'rejected', reason },
          ])) as SWRMultiResult<T>[];
      }
    },
    {
      ...config,
      onError(err, swrKey) {
        console.log('SWR onError', err, swrKey);
        config?.onError?.(err, swrKey, config as any);
      },
    },
  );
};
