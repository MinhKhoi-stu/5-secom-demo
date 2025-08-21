import { PagingDto } from "dto/common";

export type FindAllOptionDto = PagingDto & {
  codeOrName: string;
  optionGroupCode: string;
  sort?: string;
  parentId?: string;
};
