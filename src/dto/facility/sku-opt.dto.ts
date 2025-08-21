export interface SkuOptDto {
  id: string;
  code: string;
  name: string;
  note?: string | null;
  config?: string | null;
  orderNo?: number;
}
