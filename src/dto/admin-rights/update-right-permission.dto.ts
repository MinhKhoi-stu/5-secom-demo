export type UpdateRightPermissionDto = {
  version: number;
  id: string;
  permissions: [
    {
      resource: {
        id: string;
      };
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
      exec: boolean;
    }
  ];
};
