import { useSWRWrapper } from 'hooks/swr';
import { useAccount } from 'hooks/account/useAccount';

export const useIdentificationCheck = () => {
  const { selectedAccount } = useAccount();
  const search = new URLSearchParams({
    accountNumber: selectedAccount?.accountNumber || '',
  }).toString();
  const url = '/api/v1/account/change-identification/check-unlock';
  const key = `${url}?${search}`;
  return useSWRWrapper<any>(key, {
    enable: !!selectedAccount?.accountNumber,
  });
};
