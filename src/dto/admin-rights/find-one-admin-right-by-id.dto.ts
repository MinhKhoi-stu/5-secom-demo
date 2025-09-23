export type FindOneAdminRightByIdDto = {
  version: 0;
  createdBy: string;
  updatedBy: string;
  createdDate: string;
  updatedDate: string;
  id: string;
  code: string;
  name: string;
  note: string;
  menus: [
    {
      id: string;
      code: string;
      name: string;
      url: string;
      icon: string;
      orderNo: string;
      parentId: string;
    }
  ];
  permissions: [
    {
      resource: {
        version: 0;
        createdBy: string;
        updatedBy: string;
        createdDate: string;
        updatedDate: string;
        id: string;
        code: string;
        name: string;
        note: string;
      };
      create: boolean;
      read: boolean;
      update: boolean;
      delete: boolean;
      exec: boolean;
    }
  ];
};
