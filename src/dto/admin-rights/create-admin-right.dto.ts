export type CreateAdminRightDto = {
  code: string;
  name: string;
  note: string;
  menus?: [
    {
      id: string;
    }
  ];
  permissions?: [
    {
      resource: {
        id: string;
      };
      create: true;
      read: true;
      update: true;
      delete: true;
      exec: true;
    }
  ];
};
