import { authAPI } from 'api/auth';
import { useMutation } from 'react-query';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from 'routes/constants';
import { locales } from 'utils/constants';

export function useVerifyOtpResetPassword() {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: authAPI.verifyOtpResetPassword,
    onSuccess: (data) => {
      toast(locales.verifySuccess, { type: 'success' });
      navigate({
        pathname: PATH.RESET_PASSWORD,
        search: createSearchParams(data).toString(),
      });
    },
  });

  return mutation;
}
