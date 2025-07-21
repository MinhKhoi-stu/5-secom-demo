// ĐỊNH NGHĨA KIỂU DỮ LIỆU
export interface Order {
  customer: string;
  id: string;
  sku: string;
  orderId: string;
  date: string;
  demoImage: string;
  product: string;
  size: string;
  type: string;
  quantity: number;
  status: string;
}

export interface newOrders {
  sku: string;
  orderId: string;
  shop: string;
  date: string;
  customer: string;
  product: string;
  type: string;
  quantity: number;
  status: string;
}

export interface SKUDesign {
  sku: string;
  img: string;
  type: string;
  file: string;
  fileUrl: string;
  fulfillment: string;
  quantity: string;
  worker: string;
}

export interface TopFile {
  id: string;
  name: string;
  email: string;
  img: string;
  files: number;
}

export interface TotalOrders {
  id: string;
  name: string;
  img: string;
  count: number;
}

export interface orderStatus {
  label: string;
  count: number;
  color: string;
}