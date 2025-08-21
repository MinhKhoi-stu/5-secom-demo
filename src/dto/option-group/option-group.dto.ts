import {OptionDto} from "dto/option/option.dto";

export type OptionGroupDto = {
  // content: [];
  id: string;
  code: string; //
  name: string;
  options: OptionDto[];
};
