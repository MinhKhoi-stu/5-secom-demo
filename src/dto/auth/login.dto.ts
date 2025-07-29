import { AdminUserDto } from 'dto/admin-users/admin-user.dto';

import { Yup } from 'utils/yup';
import { TokenDto } from './token.dto';

export type LoginDto = {
  username: string;
  password: string;
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope: string;
};

export type LoginDataDto = TokenDto & {
  profile: AdminUserDto;
};

export const loginSchema = Yup.object().shape({
  username: Yup.string().max(255).required(),
  password: Yup.string().max(255).required(),
});
