export interface TreeOrgunitDto {
  id: string;
  code: string;
  name: string;
  lvl: number;
  namePath: [string];
  children: [
    {
      id: string;
    },
    {
      id: string;
    }
  ];
}
