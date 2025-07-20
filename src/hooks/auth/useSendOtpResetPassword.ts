import { authAPI } from 'api/auth';
import { SendOtpDto } from 'dto/auth';
import { DefaultResponseDto } from 'dto/common';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { locales } from 'utils/constants';

type PropsType = {
  onSuccess?: (
    data: DefaultResponseDto,
    variables: SendOtpDto,
    context: unknown
  ) => void | Promise<unknown>;
};

export function useSendOtpResetPassword(props: PropsType) {
  const mutation = useMutation({
    mutationFn: authAPI.sendOtpResetPassword,
    onSuccess: (data, variables, context) => {
      toast(locales.sendEmailSuccess, { type: 'success' });
      if (props.onSuccess) {
        props.onSuccess(data, variables, context);
      }
    },
  });

  return mutation;
}
