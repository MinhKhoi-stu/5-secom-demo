import { PagingDto } from "dto/common";

export type FindAllOptionDto = PagingDto & {
  optionGroupCode: string;
  // codeOrName: string;
};
