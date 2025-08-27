export interface MenuDto {
  id: string;
  code?: string;
  name: string;
  url?: string | null;
  icon?: string | null;
  orderNo?: string | null;
  parentId?: string | null;
}