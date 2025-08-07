import { PagingDto } from "dto/common";

export type FindAllProductDto = PagingDto & {
  page?: number;
  size?: number;
  optGroupCode: string;
};
