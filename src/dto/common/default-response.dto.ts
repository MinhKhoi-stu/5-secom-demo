import { HTTP_STATUS } from 'utils/enums';

export type DefaultResponseDto = {
  statusCode: HTTP_STATUS;
  message: string;
};
