import { authAPI } from 'api/auth';
import { ResetPasswordDto } from 'dto/auth';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from 'routes/constants';
import { locales } from 'utils/constants';

export function useResetPassword(token: string) {
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (payload: ResetPasswordDto) =>
      authAPI.resetPassword(payload, token),
    onSuccess: () => {
      toast(locales.updatePasswordSuccess, { type: 'success' });
      navigate(PATH.LOGIN);
    },
  });

  return mutation;
}
