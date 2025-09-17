import { AdminRightDto } from "dto/admin-rights/admin-rights.dto";
import { PERMISSION } from "utils/enums";
import { Yup } from "utils/yup";

export type CreateAdminRoleDto = {
  code: string;
  name: string;
  level?: number;
  note?: string;
  // permission?: string;
  // rights?: Array<AdminRightDto["id"]>;
  rights?: Array<Pick<AdminRightDto, "id">>;
};

export const createAdminRoleSchema = Yup.object().shape({
  code: Yup.string().max(50).required().default(""),
  name: Yup.string().max(255).required().default(""),
  note: Yup.string().max(512).notRequired(),
  // permissions: Yup.array(
  //   Yup.mixed<PERMISSION>().oneOf(Object.values(PERMISSION)).required()
  // )
  //   .notRequired()
  //   .default([]),
});
