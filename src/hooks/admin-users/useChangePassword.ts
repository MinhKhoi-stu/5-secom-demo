import { useMutation } from "react-query";
import { DefaultResponseDto } from "dto/common";
import {UpdateMyPasswordDto} from "dto/admin-users";
import {adminUsersAPI} from "api/admin-users";

type UseChangeMyPasswordProps = {
  onSuccess?: (data: DefaultResponseDto) => void;
  onError?: (error: any) => void;
};

export const useChangeMyPassword = ({ onSuccess, onError }: UseChangeMyPasswordProps = {}) => {
  return useMutation<DefaultResponseDto, unknown, UpdateMyPasswordDto>(
    (data: UpdateMyPasswordDto) => adminUsersAPI.updateMyPassword(data),
    {
      onSuccess,
      onError,
    }
  );
};
