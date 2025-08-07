import {OptionDto} from "dto/option/option.dto";

export type OptionGroupDto = {
  id: string;
  code: string; //
  name: string;
  options: OptionDto[];
};
