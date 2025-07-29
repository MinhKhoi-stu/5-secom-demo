import { adminUsersAPI } from 'api/admin-users';
import { useQuery, useQueryClient } from 'react-query';
import { PATH } from 'routes/constants';
import { localStorageKey } from 'utils/constants';
import { QUERY_KEY } from 'utils/enums';

type PropsType = {
  enabled?: boolean;
};

export function useGetMyProfile(props?: PropsType) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: QUERY_KEY.GET_MY_PROFILE,
    queryFn: adminUsersAPI.getMyProfile,
    cacheTime: Infinity,
    refetchOnMount: false,
    enabled: props?.enabled ?? false,
    onError: () => {
      clearToken();
    },
  });

  function clearToken() {
    //TODO: call api to get user's info ---- 
    localStorage.removeItem(localStorageKey.accessToken);
    localStorage.removeItem(localStorageKey.refreshToken);
    queryClient.setQueryData(QUERY_KEY.GET_MY_PROFILE, null);
    window.location.href = PATH.LOGIN;
  }

  return query;
}
