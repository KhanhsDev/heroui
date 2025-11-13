import type { TFunction } from 'i18next';
import type { RestResponse } from 'interfaces';

import { METHOD } from 'global/common';

import { isBlank } from './common';

export const replacePlaceholder = (
  s: string,
  data: Record<string, unknown>,
) => {
  const parts = s.split(/{(.*?)}/g).map(v => {
    const replaced = v.replace(/{/g, '');
    if (data instanceof FormData) {
      return data.get(replaced) || replaced;
    }
    return data[replaced] || replaced;
  });

  return parts.join('');
};

export const fetcher = async <T = any>(
  url: string,
  method: METHOD,
  body?: Record<string, unknown> | FormData,
  headers?: HeadersInit,
  noEndPoint?: boolean,
) => {
  let parsedUri = `${noEndPoint ? '' : (process.env.REST_ENDPOINT ?? '')}${url}${
    method === METHOD.GET && body
      ? `?${new URLSearchParams(body as unknown as Record<string, string>)}`
      : ''
  }`;
  parsedUri = replacePlaceholder(
    parsedUri,
    (body as unknown as Record<string, unknown>) || {},
  );
  const reqHeaders = {
    ...headers,
    ...(!(body instanceof FormData) && {
      'Content-Type': 'application/json; charset=UTF-8',
    }),
  };

  const res = await fetch(parsedUri, {
    method,
    headers: reqHeaders,
    ...(method !== METHOD.GET && {
      body: body instanceof FormData ? body : JSON.stringify(body),
    }),
  });
  if (!res.ok) {
    let error: any = {};
    const errorText = await res.text();
    try {
      error = JSON.parse(errorText);
    } catch {
      error.message = errorText;
    }
    error.status = res.status;

    throw error;
  }

  return res.json() as Promise<RestResponse<T>>;
};

export const getRequestErrorMessage = (error: unknown, t: TFunction) => {
  let errorMessage: string | undefined | null;

  if ((error as Record<string, string>).message) {
    errorMessage = (error as Record<string, string>).message;
  } else if ((error as Record<string, string>).code) {
    errorMessage = t(
      (error as Record<string, string>).code,
      (error as Record<string, string>).messageParams,
    );
    if (errorMessage === (error as Record<string, string>).code) {
      errorMessage = t('DEFAULT_ERROR', {
        content: (error as Record<string, string>).code,
        ...(error as Record<string, Record<string, unknown>>).messageParams,
      });
    }
  }

  return !isBlank(errorMessage!)
    ? errorMessage
    : (error as Record<string, string>).code;
};
