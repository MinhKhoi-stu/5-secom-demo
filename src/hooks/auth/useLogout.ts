import { authAPI } from 'api/auth';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { PATH } from 'routes/constants';
import { localStorageKey } from 'utils/constants';
import { QUERY_KEY } from 'utils/enums';

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => authAPI.logout({}),
    onMutate: () => {
      setTimeout(() => { 
        // just remove localStorage.removeItem(localStorageKey.accessToken); and localStorage.removeItem(localStorageKey.refreshToken); if do not call api
        localStorage.removeItem(localStorageKey.accessToken);
        localStorage.removeItem(localStorageKey.refreshToken);
        queryClient.setQueryData(QUERY_KEY.GET_MY_PROFILE, null);
        navigate(PATH.LOGIN, { replace: true });
      }, 100);
    },
  });

  return mutation;
}
