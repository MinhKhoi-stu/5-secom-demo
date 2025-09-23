import {AdminRightDto} from "dto/admin-rights/admin-rights.dto";

export type UpdateRightOfRoleDto = {
  version: number;
  id: string;
  rights?: Array<Pick<AdminRightDto, "id">>;
};
